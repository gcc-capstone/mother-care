import imgStatus from "../assets/af6c9.svg";
import imgPlus from "../assets/ce264.svg";
import imgShieldCheck from "../assets/8878d.svg";
import imgSearch from "../assets/46af3.svg";
import imgChevronDown from "../assets/b356d.svg";
import imgBadgeCheck from "../assets/8878d.svg";
import imgSelector from "../assets/4e6f4.svg";
import imgSelector1 from "../assets/56fc8.svg";
import imgStatus1 from "../assets/8d6a0.svg";

export default function Workspace() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-node-id="1:27" data-name="Workspace">
      <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex h-[64px] items-center justify-between overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="1:28" data-name="Role-aware top bar">
        <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="1:29" data-name="Secure status">
          <div className="relative shrink-0 size-[8px]" data-node-id="1:30" data-name="Status">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStatus} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[11px] whitespace-nowrap" data-node-id="1:31">
            Secure Mother Care workspace
          </p>
        </div>
        <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0" data-node-id="1:32" data-name="Account">
          <div className="bg-[#dcece6] content-stretch flex items-center justify-center overflow-clip relative rounded-[999px] shrink-0 size-[34px]" data-node-id="1:33" data-name="Avatar">
            <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#2e7166] text-[10px] whitespace-nowrap" data-node-id="1:34">
              AR
            </p>
          </div>
          <div className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[0] not-italic relative shrink-0 text-[#20312e] text-[0px] whitespace-nowrap" data-node-id="1:35">
            <p className="leading-[1.35] mb-0 text-[10px]">Alex Rivera</p>
            <p className="font-['Inter:Medium'] font-medium leading-[1.35] text-[#5c6b64] text-[9px]">Counselor</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pb-[28px] pt-[24px] px-[32px] relative w-full" data-node-id="1:36" data-name="Page content">
        <div className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:37" data-name="Page heading">
          <div className="[word-break:break-word] flex-[1_0_0] font-['Lora:Bold'] font-bold leading-[0] min-w-px relative text-[#20312e] text-[0px]" data-node-id="1:38">
            <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[1.12] mb-0 not-italic text-[#2e7166] text-[10px]">CARE CONTINUITY</p>
            <p className="leading-[1.12] text-[28px]">Recommend a resource</p>
          </div>
          <div className="bg-[#1d3b34] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[8px] h-[38px] items-center overflow-clip px-[14px] relative rounded-[10px] shrink-0" data-node-id="1:39" data-name="Button">
            <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="1:40">
              New referral
            </p>
            <div className="relative shrink-0 size-[13px]" data-node-id="1:41" data-name="plus">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
            </div>
          </div>
        </div>
        <div className="bg-[#f3eedf] content-stretch flex gap-[10px] items-center min-h-[42px] overflow-clip px-[13px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="1:43" data-name="Security context banner">
          <div className="relative shrink-0 size-[16px]" data-node-id="1:44" data-name="shield-check">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldCheck} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.4] min-w-px not-italic relative text-[#20312e] text-[10px]" data-node-id="1:46">
            Recommendations use the verified Admin Resource Database. Availability is current as of the last partner verification.
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-start leading-[normal] relative shrink-0 w-full" data-node-id="1:47" data-name="Summary metrics">
          <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[96px] items-start min-w-px overflow-clip p-[14px] relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:48" data-name="Metric">
            <p className="font-['Inter:Extra_Bold'] font-extrabold not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:49">
              DUE TODAY
            </p>
            <p className="font-['Lora:Bold'] font-bold relative shrink-0 text-[#20312e] text-[24px] w-full" data-node-id="1:50">
              6
            </p>
            <p className="font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:51">
              Across active caseload
            </p>
          </div>
          <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[96px] items-start min-w-px overflow-clip p-[14px] relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:52" data-name="Metric">
            <p className="font-['Inter:Extra_Bold'] font-extrabold not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:53">
              OVERDUE
            </p>
            <p className="font-['Lora:Bold'] font-bold relative shrink-0 text-[#20312e] text-[24px] w-full" data-node-id="1:54">
              3
            </p>
            <p className="font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:55">
              Oldest is 2 days late
            </p>
          </div>
          <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[96px] items-start min-w-px overflow-clip p-[14px] relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:56" data-name="Metric">
            <p className="font-['Inter:Extra_Bold'] font-extrabold not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:57">
              AWAITING MOTHER
            </p>
            <p className="font-['Lora:Bold'] font-bold relative shrink-0 text-[#20312e] text-[24px] w-full" data-node-id="1:58">
              8
            </p>
            <p className="font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:59">
              No pressure language
            </p>
          </div>
          <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[96px] items-start min-w-px overflow-clip p-[14px] relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:60" data-name="Metric">
            <p className="font-['Inter:Extra_Bold'] font-extrabold not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:61">
              COMPLETED
            </p>
            <p className="font-['Lora:Bold'] font-bold relative shrink-0 text-[#20312e] text-[24px] w-full" data-node-id="1:62">
              42
            </p>
            <p className="font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:63">
              This month
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] h-[780px] items-start relative shrink-0 w-full" data-node-id="1:64" data-name="Unified workspace">
          <div className="content-stretch flex h-full items-start relative shrink-0 w-[734px]" data-node-id="1:65" data-name="Primary workspace">
            <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col h-[780px] items-start min-w-px overflow-clip relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:66" data-name="Integrated verified resource directory">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-h-px overflow-clip p-[18px] relative w-full" data-node-id="1:67" data-name="Panel body">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="1:68" data-name="Section heading">
                  <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full" data-node-id="1:69">
                    Verified community resources
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full" data-node-id="1:70">
                    Integrated from Admin Resource Database · 126 records
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:71" data-name="Table toolbar">
                  <div className="bg-[#f7f5ee] border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[36px] items-center min-w-px overflow-clip px-[11px] relative rounded-[8px]" data-node-id="1:72" data-name="Search">
                    <div className="relative shrink-0 size-[13px]" data-node-id="1:73" data-name="search">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} />
                    </div>
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#87938e] text-[11px]" data-node-id="1:75">
                      Search service, distance, county…
                    </p>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex gap-[7px] h-[36px] items-center overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-node-id="1:76" data-name="Filter">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap" data-node-id="1:77">
                      Service type
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="1:78" data-name="chevron-down">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex gap-[7px] h-[36px] items-center overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-node-id="1:80" data-name="Filter">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap" data-node-id="1:81">
                      Availability
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="1:82" data-name="chevron-down">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex gap-[7px] h-[36px] items-center overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-node-id="1:84" data-name="Filter">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap" data-node-id="1:85">
                      Distance
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="1:86" data-name="chevron-down">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[6px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:88" data-name="Resource filters">
                  <div className="bg-[#2d5b52] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:89" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[9px] text-white whitespace-nowrap" data-node-id="1:90">
                      Physical
                    </p>
                  </div>
                  <div className="bg-[#f7f5ee] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:91" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[9px] whitespace-nowrap" data-node-id="1:92">
                      Digital
                    </p>
                  </div>
                  <div className="bg-[#f7f5ee] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:93" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[9px] whitespace-nowrap" data-node-id="1:94">
                      Open today
                    </p>
                  </div>
                  <div className="bg-[#f7f5ee] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:95" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[9px] whitespace-nowrap" data-node-id="1:96">
                      Trusted
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] border border-[#e5eae7] border-solid content-stretch flex flex-col items-start leading-[0] not-italic overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="1:97" data-name="Data table">
                  <div className="flex flex-col font-['Inter:Extra_Bold'] font-extrabold h-[34px] justify-center relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:98">
                    <p className="leading-[normal] whitespace-pre-wrap">{`RESOURCE   ·   SERVICE   ·   DISTANCE   ·   COUNTY   ·   HOURS   ·   AVAILABILITY`}</p>
                  </div>
                  <div className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#20312e] text-[10px] w-full whitespace-pre-wrap" data-node-id="1:99">
                    <p className="leading-[3.9] mb-0">{`● The Sparrows Nest   ·   Clothing   ·   3.2 mi   ·   Allegheny   ·   Wed · 1–4 PM   ·   AVAILABLE`}</p>
                    <p className="leading-[3.9] mb-0">{`   Community Table   ·   Food Pantry   ·   4.8 mi   ·   Allegheny   ·   Today · 2–6   ·   OPEN`}</p>
                    <p className="leading-[3.9] mb-0">{`   Safe Harbor Homes   ·   Housing   ·   6.1 mi   ·   Allegheny   ·   24/7 intake   ·   2 BEDS`}</p>
                    <p className="leading-[3.9] mb-0">{`   BrightMind Therapy   ·   Mental health   ·   Digital   ·   Regional   ·   Next day   ·   AVAILABLE`}</p>
                    <p className="leading-[3.9]">{`   Little Steps   ·   Childcare   ·   11 mi   ·   Westmoreland   ·   Mon–Fri   ·   WAITLIST`}</p>
                  </div>
                </div>
                <div className="bg-[#f7f5ee] content-stretch flex gap-[8px] items-center overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:100" data-name="Trust legend">
                  <div className="relative shrink-0 size-[14px]" data-node-id="1:101" data-name="badge-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBadgeCheck} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#5c6b64] text-[10px]" data-node-id="1:103">
                    All shown resources are trusted and verified. The Sparrows Nest was reverified Sep 28.
                  </p>
                  <div className="bg-[#eaf2f6] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:104" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#2e7166] text-[9px] whitespace-nowrap" data-node-id="1:105">
                      PHYSICAL
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full" data-node-id="1:106" data-name="Pagination">
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5c6b64] whitespace-nowrap" data-node-id="1:107">
                    1–5 of 126 resources
                  </p>
                  <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[#2e7166] whitespace-pre" data-node-id="1:108">{`‹ Previous   1  2  3   Next ›`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] h-full items-start min-w-px relative" data-node-id="1:109" data-name="Action and sync hub">
            <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col h-[780px] items-start min-w-px overflow-clip relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:110" data-name="Referral composer">
              <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex flex-col gap-[12px] items-start p-[18px] relative shrink-0 w-full" data-node-id="1:111" data-name="Referral context">
                <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:112" data-name="Identity">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative" data-node-id="1:113" data-name="Section heading">
                    <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full" data-node-id="1:114">
                      Referral for Jan Williams
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full" data-node-id="1:115">
                      Selected resource · The Sparrows Nest
                    </p>
                  </div>
                  <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:116" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap" data-node-id="1:117">
                      VERIFIED
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:118">
                  <p className="leading-[1.5] mb-0">1917 Freeport Road, Natrona Heights, PA 15065</p>
                  <p className="leading-[1.5]">(724) 226-0606 · Wednesday 1:00 PM–4:00 PM</p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Bold'] font-bold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full whitespace-nowrap" data-node-id="1:119" data-name="Information row">
                  <p className="relative shrink-0 text-[#5c6b64]" data-node-id="1:120">
                    Distance from Jan
                  </p>
                  <p className="relative shrink-0 text-[#20312e]" data-node-id="1:121">
                    3.2 miles
                  </p>
                </div>
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:122" data-name="Information row">
                  <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[10px] whitespace-nowrap" data-node-id="1:123">
                    Availability
                  </p>
                  <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-node-id="1:124" data-name="Status tag">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap" data-node-id="1:125">
                      Accepting walk-ins
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px p-[18px] relative w-full" data-node-id="1:126" data-name="Referral details">
                <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:127" data-name="Field">
                  <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:128">
                    Message to Jan
                  </p>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex items-start min-h-[76px] overflow-clip px-[11px] py-[9px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:129" data-name="Input">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[#20312e] text-[11px]" data-node-id="1:130">
                      Hi Jan, The Sparrows Nest has interview clothing available Wednesday afternoon. Their team knows you may stop by between 1:00 and 4:00 PM.
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:131" data-name="Priority choices">
                  <div className="bg-[#edf6f2] border border-[#2e7166] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]" data-node-id="1:132" data-name="Choice">
                    <div className="relative shrink-0 size-[14px]" data-node-id="1:133" data-name="Selector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector} />
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1:134" data-name="Choice copy">
                      <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:135">
                        Standard priority
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]" data-node-id="1:136" data-name="Choice">
                    <div className="relative shrink-0 size-[14px]" data-node-id="1:137" data-name="Selector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector1} />
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1:138" data-name="Choice copy">
                      <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:139">
                        High priority
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:140" data-name="Field row">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="1:141" data-name="Field">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:142">
                      Associate with
                    </p>
                    <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex items-start min-h-[36px] overflow-clip px-[11px] py-[9px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:143" data-name="Input">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[#20312e] text-[11px]" data-node-id="1:144">
                        Pick Up Interview Clothes
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="1:145" data-name="Field">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:146">
                      Tracking
                    </p>
                    <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex items-start min-h-[36px] overflow-clip px-[11px] py-[9px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:147" data-name="Input">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[#20312e] text-[11px]" data-node-id="1:148">
                        Request outcome
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="1:149" data-name="Visibility">
                  <div className="bg-[#edf6f2] border border-[#2e7166] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]" data-node-id="1:150" data-name="Choice">
                    <div className="relative shrink-0 size-[14px]" data-node-id="1:151" data-name="Selector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector} />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="1:152" data-name="Choice copy">
                      <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:153">
                        Mother-visible
                      </p>
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:154">
                        Full referral
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]" data-node-id="1:155" data-name="Choice">
                    <div className="relative shrink-0 size-[14px]" data-node-id="1:156" data-name="Selector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector1} />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="1:157" data-name="Choice copy">
                      <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full" data-node-id="1:158">
                        Add private note
                      </p>
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full" data-node-id="1:159">
                        Care team only
                      </p>
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] bg-[#edf6f2] content-stretch flex flex-col gap-[5px] items-start not-italic overflow-clip p-[11px] relative rounded-[10px] shrink-0 w-full" data-node-id="1:160" data-name="Dispatch preview">
                  <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap" data-node-id="1:161">
                    Client preview
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[1.45] min-w-full relative shrink-0 text-[#5c6b64] text-[9px] w-[min-content]" data-node-id="1:162">
                    Jan will receive the verified address, call button, hours, your message, and a simple "Did this help?" follow-up.
                  </p>
                </div>
              </div>
              <div className="bg-[#122c27] content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative shrink-0 w-full" data-node-id="1:163" data-name="System dispatch and sync">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:164" data-name="Sync status">
                  <div className="relative shrink-0 size-[8px]" data-node-id="1:165" data-name="Status">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStatus1} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-px not-italic relative text-[#d8eee7] text-[10px]" data-node-id="1:166">
                    ⚡ Referral is complete and trackable
                  </p>
                </div>
                <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter:Extra_Bold'] font-extrabold h-[42px] items-center justify-between leading-[normal] not-italic overflow-clip px-[14px] relative rounded-[10px] shrink-0 text-[#1d3b34] w-full" data-node-id="1:167" data-name="Dispatch action">
                  <p className="flex-[1_0_0] min-w-px relative text-[11px]" data-node-id="1:168">
                    Send Referral to Mother Client
                  </p>
                  <p className="relative shrink-0 text-[13px] whitespace-nowrap" data-node-id="1:169">
                    ↗
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#9fc6bc] text-[9px] w-full" data-node-id="1:170">
                  ⚡ Syncs automatically to Mother Client App
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
