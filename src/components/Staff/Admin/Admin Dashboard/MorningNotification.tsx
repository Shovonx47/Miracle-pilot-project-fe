interface NotificationProps {
  name: string;
  message?: string;
  updatedDate?: string;
}

const MorningNotification = ({
  name,
  message = "Have a Good day at work",
  updatedDate = "15 Feb 2025"
}: NotificationProps) => {
  return (
    <div className="bg-[#202C4B] text-white p-4 w-full relative rounded-sm">
      {/* Mobile-friendly layout with stacked elements */}
      <div className="flex flex-col">
        {/* Name greeting - full width and smaller on mobile */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          Welcome Back, Mr. {name}
        </h1>
        
        {/* Message - full width */}
        <p className="text-white/90 text-sm mb-4 sm:mb-2">
          {message}
        </p>
        
        {/* Date - positioned at bottom on mobile, right corner on desktop */}
        <div className="text-xs text-white/80 sm:absolute sm:top-8 sm:right-4 mt-2 sm:mt-0">
          Updated Recently on {updatedDate}
        </div>
      </div>
    </div>
  );
};

export default MorningNotification;