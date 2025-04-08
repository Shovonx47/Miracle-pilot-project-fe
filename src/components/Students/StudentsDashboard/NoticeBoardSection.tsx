import { useGetAllNoticesQuery } from '@/redux/api/Notice/noticeApi';

const NoticeBoardSection = () => {
  const { data: notices = [], isLoading, error } = useGetAllNoticesQuery();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Notice Board</h2>
        <button className="text-gray-600 text-sm">View All</button>
      </div>

      <div className="relative mt-8">
        {/* Timeline line */}
        <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200" />

        {/* Notice items */}
        {isLoading ? (
          <div className="flex justify-center py-4">
            <p>Loading notices...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center py-4 text-red-500">
            <p>Error loading notices: {(error as any)?.data?.message || 'Failed to fetch notices'}</p>
          </div>
        ) : notices.length === 0 ? (
          <div className="flex justify-center py-4 text-gray-500">
            <p>No notices available</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div key={notice.id} className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full ${notice.color} border-2 border-white ring-2 ring-gray-100`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded p-3">
                  <h4 className="font-medium text-gray-900">{notice.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">Added on : {notice.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoardSection;