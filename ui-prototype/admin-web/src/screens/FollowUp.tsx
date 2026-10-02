import imgStatus from "../assets/af6c9.svg";
import imgPlus from "../assets/ce264.svg";
import imgShieldCheck from "../assets/8878d.svg";
import imgSearch from "../assets/46af3.svg";
import imgChevronDown from "../assets/b356d.svg";
import imgSelector from "../assets/4e6f4.svg";
import imgSelector1 from "../assets/56fc8.svg";
import imgStatus1 from "../assets/8d6a0.svg";

export default function App() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full min-h-screen" data-node-id="1:2" data-name="Workspace">
      <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex h-[64px] items-center justify-between overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="1:3">
        <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="1:4">
          <div className="relative shrink-0 size-[8px]" data-node-id="1:5">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStatus} />
          </div>
          <p className="[word-break:break-word] font-['Inter'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[11px] whitespace-nowrap" data-node-id="1:6">
            Secure Mother Care workspace
          </p>
        </div>
        <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0" data-node-id="1:7">
          <div className="bg-[#dcece6] content-stretch flex items-center justify-center overflow-clip relative rounded-[999px] shrink-0 size-[34px]" data-node-id="1:8">
            <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#2e7166] text-[10px] whitespace-nowrap" data-node-id="1:9">
              AR
            </p>
          </div>
          <div className="[word-break:break-word] font-['Inter'] font-extrabold leading-[0] not-italic relative shrink-0 text-[#20312e] text-[0px] whitespace-nowrap" data-node-id="1:10">
            <p className="leading-[1.35] mb-0 text-[10px]">Alex Rivera</p>
            <p className="font-['Inter'] font-medium leading-[1.35] text-[#5c6b64] text-[9px]">Counselor</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pb-[28px] pt-[24px] px-[32px] relative w-full" data-node-id="1:11">
        <div className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full" data-node-id="1:12">
          <div className="[word-break:break-word] flex-[1_0_0] font-['Lora'] font-bold leading-[0] min-w-px relative text-[#20312e] text-[0px]" data-node-id="1:13">
            <p className="font-['Inter'] font-extrabold leading-[1.12] mb-0 not-italic text-[#2e7166] text-[10px]">CARE CONTINUITY</p>
            <p className="leading-[1.12] text-[28px]">{`Follow-ups & outcomes`}</p>
          </div>
          <div className="bg-[#1d3b34] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[8px] h-[38px] items-center overflow-clip px-[14px] relative rounded-[10px] shrink-0" data-node-id="1:14">
            <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="1:15">
              Create follow-up
            </p>
            <div className="relative shrink-0 size-[13px]" data-node-id="1:16">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
            </div>
          </div>
        </div>
        <div className="bg-[#f3eedf] content-stretch flex gap-[10px] items-center min-h-[42px] overflow-clip px-[13px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="1:18">
          <div className="relative shrink-0 size-[16px]" data-node-id="1:19">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldCheck} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[1.4] min-w-px not-italic relative text-[#20312e] text-[10px]" data-node-id="1:21">
            Mother-confirmed feedback is preserved verbatim. Recording a final outcome adds your name and timestamp to the audit log.
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-start leading-[normal] relative shrink-0 w-full" data-node-id="1:22">
          {[
            { label: "DUE TODAY", value: "6", sub: "Goals and referrals" },
            { label: "OVERDUE", value: "3", sub: "Oldest: 2 days" },
            { label: "AWAITING MOTHER", value: "8", sub: "No pressure language" },
            { label: "SUCCESSFUL THIS MONTH", value: "42", sub: "Confirmed outcomes" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[96px] items-start min-w-px overflow-clip p-[14px] relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]">
              <p className="font-['Inter'] font-extrabold not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full">{label}</p>
              <p className="font-['Lora'] font-bold relative shrink-0 text-[#20312e] text-[24px] w-full">{value}</p>
              <p className="font-['Inter'] font-normal not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full">{sub}</p>
            </div>
          ))}
        </div>
        <div className="content-stretch flex gap-[16px] items-stretch relative shrink-0 w-full" data-node-id="1:39">
          {/* Review Queue */}
          <div className="content-stretch flex items-stretch relative shrink-0 min-w-0" data-node-id="1:40">
            <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:41">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-h-px overflow-clip p-[18px] relative w-full" data-node-id="1:42">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="1:43">
                  <p className="font-['Inter'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full">Review Queue</p>
                  <p className="font-['Inter'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full">17 open items · sorted by urgency and due date</p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="1:46">
                  <div className="bg-[#f7f5ee] border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[36px] items-center min-w-px overflow-clip px-[11px] relative rounded-[8px]">
                    <div className="relative shrink-0 size-[13px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} />
                    </div>
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[normal] min-w-px not-italic relative text-[#87938e] text-[11px]">Search mother, resource, goal…</p>
                  </div>
                  {["Awaiting Outcome", "Overdue", "Completed"].map((f) => (
                    <div key={f} className="bg-white border border-[#e5eae7] border-solid content-stretch flex gap-[7px] h-[36px] items-center overflow-clip px-[10px] relative rounded-[8px] shrink-0">
                      <p className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap">{f}</p>
                      <div className="relative shrink-0 size-[12px]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronDown} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="[word-break:break-word] border border-[#e5eae7] border-solid content-stretch flex flex-col items-start leading-[0] not-italic overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="1:63">
                  <div className="flex flex-col font-['Inter'] font-extrabold h-[34px] justify-center px-[12px] relative shrink-0 text-[#5c6b64] text-[9px] w-full">
                    <p className="leading-[normal] whitespace-pre-wrap">{`MOTHER   ·   RECORD   ·   TYPE   ·   DUE   ·   STATUS`}</p>
                  </div>
                  <div className="font-['Inter'] font-normal relative shrink-0 text-[#20312e] text-[10px] w-full whitespace-pre-wrap px-[12px]">
                    <p className="leading-[3.9] mb-0">{`● Jan Williams   ·   The Sparrows Nest   ·   Referral   ·   Yesterday   ·   AWAITING OUTCOME`}</p>
                    <p className="leading-[3.9] mb-0">{`   Nia Simmons   ·   Little Steps Childcare   ·   Referral   ·   2 days ago   ·   OVERDUE`}</p>
                    <p className="leading-[3.9] mb-0">{`   Maria Diaz   ·   Nutrition appointment   ·   Goal   ·   Today   ·   REVIEW TODAY`}</p>
                    <p className="leading-[3.9] mb-0">{`   Elena Perez   ·   Housing intake   ·   Goal   ·   2 days ago   ·   OVERDUE`}</p>
                    <p className="leading-[3.9]">{`   Keisha Reed   ·   New Parent Circle   ·   Referral   ·   Tomorrow   ·   SCHEDULED`}</p>
                  </div>
                </div>
                <div className="bg-[#edf6f2] content-stretch flex gap-[10px] items-center overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full" data-node-id="1:66">
                  <div className="bg-[#2e7166] content-stretch flex items-center justify-center overflow-clip relative rounded-[999px] shrink-0 size-[34px]">
                    <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">JW</p>
                  </div>
                  <div className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[0] min-w-px not-italic relative text-[#20312e] text-[10px]">
                    <p className="font-['Inter'] font-extrabold leading-[1.45] mb-0">Jan · The Sparrows Nest selected</p>
                    <p className="leading-[1.45]">Visited Sep 25 · Interview clothes referral · awaiting final outcome</p>
                  </div>
                  <div className="bg-[#2d5b52] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                    <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[9px] text-white whitespace-nowrap">SELECTED</p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full" data-node-id="1:72">
                  <p className="font-['Inter'] font-normal relative shrink-0 text-[#5c6b64] whitespace-nowrap">1–5 of 17 follow-ups</p>
                  <p className="font-['Inter'] font-extrabold relative shrink-0 text-[#2e7166] whitespace-pre">{`‹ Previous   1  2  3   Next ›`}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Outcome Panel */}
          <div className="flex flex-1 items-start min-w-0" data-node-id="1:75">
            <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]" data-node-id="1:76">
              <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex flex-col gap-[12px] items-start p-[18px] relative shrink-0 w-full" data-node-id="1:77">
                <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative">
                    <p className="font-['Inter'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full">Jan · The Sparrows Nest</p>
                    <p className="font-['Inter'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full">Referral visit · September 25, 2026</p>
                  </div>
                  <div className="bg-[#fff3d9] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                    <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#9b621b] text-[9px] whitespace-nowrap">AWAITING OUTCOME</p>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[10px] whitespace-nowrap">Received support</p>
                  <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                    <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap">Yes</p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-bold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full whitespace-nowrap">
                  <p className="relative shrink-0 text-[#5c6b64]">Goal</p>
                  <p className="relative shrink-0 text-[#20312e]">Interview clothes</p>
                </div>
                <div className="[word-break:break-word] bg-[#edf6f2] content-stretch flex flex-col gap-[5px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full">
                  <p className="font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[10px] whitespace-nowrap">★★★★★ · Positive</p>
                  <p className="font-['Lora'] font-normal italic leading-[1.35] min-w-full relative shrink-0 text-[#20312e] text-[15px] w-[min-content]">"Very kind staff and great selection,"</p>
                </div>
                <div className="[word-break:break-word] font-['Inter'] font-normal leading-[0] not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full">
                  <p className="leading-[1.5] mb-0">Sep 28 · Mother shared feedback in app</p>
                  <p className="leading-[1.5]">Sep 25 · Referral opened from Jan's goal</p>
                </div>
              </div>
              <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px p-[18px] relative w-full" data-node-id="1:95">
                <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap">Outcome</p>
                <div className="bg-[#edf6f2] border border-[#2e7166] border-solid content-stretch flex gap-[9px] items-center overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[14px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative">
                    <p className="font-['Inter'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full">Successful referral</p>
                    <p className="font-['Inter'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full">Jan visited and received useful support</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  {[{ label: "Partially successful" }, { label: "Could not access" }].map(({ label }) => (
                    <div key={label} className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]">
                      <div className="relative shrink-0 size-[14px]">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector1} />
                      </div>
                      <p className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full">Follow-up notes</p>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex items-start min-h-[76px] overflow-clip px-[11px] py-[9px] relative rounded-[8px] shrink-0 w-full">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[1.45] min-w-px not-italic relative text-[#20312e] text-[11px]">
                      Jan found interview clothes and confirmed the staff was welcoming. No further clothing support needed.
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="bg-[#edf6f2] border border-[#2e7166] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]">
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector} />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative">
                      <p className="font-['Inter'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full">Share summary</p>
                      <p className="font-['Inter'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full">Mother-visible</p>
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]">
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector1} />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative">
                      <p className="font-['Inter'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full">Private note</p>
                      <p className="font-['Inter'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full">Care team only</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f7f5ee] content-stretch flex flex-col gap-[7px] items-start overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-full">
                  <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[10px] whitespace-nowrap">Original feedback</p>
                    <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                      <p className="[word-break:break-word] font-['Inter'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap">Preserved verbatim</p>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-bold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full whitespace-nowrap">
                    <p className="relative shrink-0 text-[#5c6b64]">Logged by</p>
                    <p className="relative shrink-0 text-[#20312e]">Alex Rivera</p>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-bold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full whitespace-nowrap">
                    <p className="relative shrink-0 text-[#5c6b64]">Audit timestamp</p>
                    <p className="relative shrink-0 text-[#20312e]">On submit</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#122c27] content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative shrink-0 w-full" data-node-id="1:137">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full">
                  <div className="relative shrink-0 size-[8px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStatus1} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-extrabold leading-[normal] min-w-px not-italic relative text-[#d8eee7] text-[10px]">⚡ Audit and notification checks passed</p>
                </div>
                <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter'] font-extrabold h-[42px] items-center justify-between leading-[normal] not-italic overflow-clip px-[14px] relative rounded-[10px] shrink-0 text-[#1d3b34] w-full">
                  <p className="flex-[1_0_0] min-w-px relative text-[11px]">{`Log Outcome & Notify Mother`}</p>
                  <p className="relative shrink-0 text-[13px] whitespace-nowrap">↗</p>
                </div>
                <p className="[word-break:break-word] font-['Inter'] font-normal leading-[normal] not-italic relative shrink-0 text-[#9fc6bc] text-[9px] w-full">⚡ Syncs automatically to Mother Client App</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
