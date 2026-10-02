const assetPathPrefix = "../assets";
const imgIndicator = `${assetPathPrefix}/8ee66.svg`;

export default function PersistentNavigation() {
  return (
    <div className="bg-[#1d3b34] content-stretch flex flex-col gap-[20px] items-start pb-[24px] pt-[28px] px-[20px] relative min-h-screen w-[220px] shrink-0">
      <div className="content-stretch flex gap-[11px] items-center overflow-clip relative shrink-0 w-full">
        <div className="bg-[#dcece6] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[42px]">
          <p className="[word-break:break-word] font-['Lora:Bold'] font-bold leading-[normal] relative shrink-0 text-[#1d3b34] text-[21px] whitespace-nowrap">
            mc
          </p>
        </div>
        <div className="[word-break:break-word] flex-[1_0_0] font-['Lora:Bold'] font-bold leading-[0] min-w-px relative text-[0px] text-white">
          <p className="leading-[1.08] mb-0 text-[20px]">Mother Care</p>
          <p className="font-['Inter:Bold'] leading-[1.08] not-italic text-[#b9cec8] text-[8px]">FAMILY LIFE NETWORK</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-full">
        <div className="bg-[#2d5b52] content-stretch flex gap-[9px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[10px] shrink-0 w-full">
          <div className="relative shrink-0 size-[8px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIndicator} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-px not-italic relative text-[11px] text-white">
            Dashboard
          </p>
        </div>
        {["Mothers", "Appointments", "Follow-ups · 4", "Forms", "Resources", "Analytics", "Roles & access", "Audit & settings"].map((item) => (
          <div key={item} className="content-stretch flex h-[40px] items-center overflow-clip px-[12px] relative rounded-[10px] shrink-0 w-full">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-px not-italic relative text-[#c7dad5] text-[11px]">
              {item}
            </p>
          </div>
        ))}
      </div>
      <div className="flex-[1_0_0] min-h-px relative w-full" />
      <div className="[word-break:break-word] bg-[#122c27] content-stretch flex flex-col gap-[6px] items-start not-italic overflow-clip p-[13px] relative rounded-[10px] shrink-0 w-full">
        <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#f5fbf8] text-[10px] w-full">
          🔒 Privacy protected
        </p>
        <p className="font-['Inter:Regular'] font-normal leading-[1.45] relative shrink-0 text-[#9cbab2] text-[9px] w-full">
          Role-based access. Sensitive activity is logged.
        </p>
      </div>
    </div>
  );
}
