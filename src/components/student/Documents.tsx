interface DocumentsProps {
  documents: {
    name: string;
  }[]
}

export default function Documents({ documents }: DocumentsProps) {

  const extractFileName = (url: string) => {
    return url.split('/').pop() || ''; // Extracts the last part of the URL (the file name)
  };

  const truncateFileName = (url: string) => {
    const fileName = extractFileName(url);
    return fileName
  };


console.log(documents)

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-3">Documents</h3>
      <hr className="border-gray-200 -mx-4 mb-3" />
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.name} className="flex items-center gap-2 p-4 bg-gray-50 rounded border">
            <div className="w-5 h-5 bg-[#FFFFFF] rounded-sm flex-shrink-0" />
            <span className="text-sm">{doc.name && extractFileName(doc.name)} </span>
          </div>
        ))}
      </div>
    </div>
  );
}