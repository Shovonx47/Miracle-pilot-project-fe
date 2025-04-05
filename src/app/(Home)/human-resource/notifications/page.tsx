"use client";

import { useState } from "react";
import { useGetAllPendingRequestsQuery, useProcessPendingRequestMutation } from "@/redux/api/PendingRequest/pendingRequestApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RequestStatus, RequestType, IPendingRequest } from "@/types/pendingRequest";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Add a custom variant type for Badge
type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

const NotificationsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [requestType, setRequestType] = useState<string | undefined>(undefined);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  const router = useRouter();

  // Get all pending requests
  const { data: pendingRequestsData, isLoading, refetch } = useGetAllPendingRequestsQuery({
    page,
    limit,
    status,
    requestType,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Process a pending request
  const [processPendingRequest, { isLoading: isProcessing }] = useProcessPendingRequestMutation();

  // Handle approving a request
  const handleApprove = async (requestId: string) => {
    try {
      const response = await processPendingRequest({
        requestId,
        data: {
          requestStatus: RequestStatus.ACCEPTED,
          updatedBy: "super_admin", // This should be the actual user ID
        },
      }).unwrap();

      if (response.success) {
        toast.success("Request approved successfully!");
        refetch();
      } else {
        toast.error(response?.message || "Failed to approve request");
      }
    } catch (error: any) {
      console.error("Error approving request:", error);
      
      // Check for specific MongoDB duplicate key error
      if (error?.data?.err?.code === 11000 || error?.data?.err?.errorResponse?.code === 11000) {
        // Extract the email from the error message if available
        const emailMatch = error?.data?.err?.errmsg?.match(/email: "([^"]+)"/);
        const email = emailMatch ? emailMatch[1] : "this email";
        
        toast.error(`Cannot approve: ${email} already exists in the system`);
      } else if (error?.data?.message) {
        // Display specific error message from the API
        toast.error(error.data.message);
      } else if (error?.data?.errorSources) {
        // Display validation errors
        const errorMessage = error.data.errorSources.map((err: any) => err.message).join(", ");
        toast.error(errorMessage);
      } else {
        // Generic error message
        toast.error("Failed to approve the request. Please try again.");
      }
    }
  };

  // Handle rejecting a request
  const handleReject = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsRejectionOpen(true);
  };

  // Submit rejection
  const submitRejection = async () => {
    if (!selectedRequestId) return;

    try {
      const response = await processPendingRequest({
        requestId: selectedRequestId,
        data: {
          requestStatus: RequestStatus.REJECTED,
          updatedBy: "super_admin", // This should be the actual user ID
          rejectionReason: rejectionReason,
        },
      }).unwrap();

      if (response.success) {
        toast.success("Request rejected");
        setIsRejectionOpen(false);
        setRejectionReason("");
        refetch();
      } else {
        toast.error("Failed to reject request");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  // View request details
  const viewRequestDetails = (requestType: RequestType, requestId: string) => {
    if (requestType === RequestType.TEACHER) {
      router.push(`/teacher/${requestId}`);
    } else if (requestType === RequestType.STUDENT) {
      router.push(`/student/${requestId}`);
    } else if (requestType === RequestType.ACCOUNTANT) {
      router.push(`/accountant/${requestId}`);
    }
  };

  // Generate request card
  const renderRequestCard = (request: IPendingRequest) => {
    const isTeacher = request.requestType === RequestType.TEACHER;
    const isStudent = request.requestType === RequestType.STUDENT;
    const isAccountant = request.requestType === RequestType.ACCOUNTANT;
    const name = isTeacher || isStudent || isAccountant
      ? `${request.requestData.firstName} ${request.requestData.lastName}`
      : "Unknown";
    const email = isTeacher || isStudent || isAccountant ? request.requestData.email : "";
    const profileImage = isTeacher || isStudent || isAccountant ? request.requestData.profileImage : "";
    const isPending = request.requestStatus === RequestStatus.PENDING;
    const isAccepted = request.requestStatus === RequestStatus.ACCEPTED;
    const isRejected = request.requestStatus === RequestStatus.REJECTED;
    const formattedDate = format(new Date(request.createdAt), "PPP");

    // Set badge variant based on status
    const badgeVariant: BadgeVariant = (
      isPending ? "outline" :
      isAccepted ? "secondary" : // Changed from "success" to "secondary"
      "destructive"
    );

    return (
      <Card key={request.requestId} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription>{email}</CardDescription>
            </div>
            <Badge variant={badgeVariant}>
              {request.requestStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Request Type: <Badge>{request.requestType}</Badge></p>
              <p className="text-sm text-muted-foreground">Submitted on: {formattedDate}</p>
            </div>
          </div>
          {isRejected && request.rejectionReason && (
            <div className="mt-2 p-3 bg-destructive/10 rounded-md">
              <p className="text-sm font-medium">Rejection Reason:</p>
              <p className="text-sm">{request.rejectionReason}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isPending && (
            <>
              <Button 
                variant="destructive" 
                onClick={() => handleReject(request.requestId)}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Reject
              </Button>
              <Button 
                variant="default" 
                onClick={() => handleApprove(request.requestId)}
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Approve
              </Button>
            </>
          )}
          <Button 
            variant="outline" 
            onClick={() => viewRequestDetails(request.requestType as RequestType, request.requestId)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex gap-2">
          <Select 
            value={status || "all"} 
            onValueChange={(val) => setStatus(val === "all" ? undefined : val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value={RequestStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={RequestStatus.ACCEPTED}>Accepted</SelectItem>
              <SelectItem value={RequestStatus.REJECTED}>Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={requestType || "all"} 
            onValueChange={(val) => setRequestType(val === "all" ? undefined : val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={RequestType.TEACHER}>Teacher</SelectItem>
              <SelectItem value={RequestType.STUDENT}>Student</SelectItem>
              <SelectItem value={RequestType.ACCOUNTANT}>Accountant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          ) : pendingRequestsData?.data?.length ? (
            pendingRequestsData.data.map(renderRequestCard)
          ) : (
            <div className="text-center p-10">
              <p className="text-muted-foreground">No pending requests found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          ) : pendingRequestsData?.data?.filter((req: IPendingRequest) => req.requestStatus === RequestStatus.PENDING)?.length ? (
            pendingRequestsData.data
              .filter((req: IPendingRequest) => req.requestStatus === RequestStatus.PENDING)
              .map(renderRequestCard)
          ) : (
            <div className="text-center p-10">
              <p className="text-muted-foreground">No pending requests found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="accepted" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          ) : pendingRequestsData?.data?.filter((req: IPendingRequest) => req.requestStatus === RequestStatus.ACCEPTED)?.length ? (
            pendingRequestsData.data
              .filter((req: IPendingRequest) => req.requestStatus === RequestStatus.ACCEPTED)
              .map(renderRequestCard)
          ) : (
            <div className="text-center p-10">
              <p className="text-muted-foreground">No accepted requests found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          ) : pendingRequestsData?.data?.filter((req: IPendingRequest) => req.requestStatus === RequestStatus.REJECTED)?.length ? (
            pendingRequestsData.data
              .filter((req: IPendingRequest) => req.requestStatus === RequestStatus.REJECTED)
              .map(renderRequestCard)
          ) : (
            <div className="text-center p-10">
              <p className="text-muted-foreground">No rejected requests found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Pagination */}
      {pendingRequestsData?.meta && (
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, pendingRequestsData.meta.total)} of {pendingRequestsData.meta.total} results
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(p => p + 1)}
              disabled={page * limit >= (pendingRequestsData.meta.total || 0)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {/* Rejection Dialog */}
      <Dialog open={isRejectionOpen} onOpenChange={setIsRejectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejectionReason">Rejection Reason</Label>
            <Textarea
              id="rejectionReason"
              placeholder="Explain why you're rejecting this request..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRejectionOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={submitRejection}
              disabled={!rejectionReason.trim() || isProcessing}
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
