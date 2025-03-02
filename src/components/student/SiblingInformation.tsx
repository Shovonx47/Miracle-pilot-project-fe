import Image from 'next/image';

interface SiblingProps {
  siblings: {
    id: string;
    avatar: string;
    siblingName: string;
    class: string;
    roll: string;
  }[]
}

export default function SiblingInformation({ siblings }: SiblingProps) {
  return (
    <div className="space-y-4 bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold">Sibling Information</h3>
      {siblings?.map((sibling) => (
        <div key={sibling?.id} className="flex items-center gap-4 bg-[#FAFAFA] p-4 flex-col sm:flex-row">
          <Image
            src={sibling?.avatar}
            alt={sibling?.siblingName}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{sibling?.siblingName}</p>
            <p className="text-sm text-gray-500">Class: {sibling?.class}</p>
            <p className="text-sm text-gray-500">Roll: {sibling?.roll}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 