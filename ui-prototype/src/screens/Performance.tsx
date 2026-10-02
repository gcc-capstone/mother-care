const assetPathPrefix = "../assets";
const imgStatus = `${assetPathPrefix}/af6c9.svg`;
const imgPlus = `${assetPathPrefix}/ce264.svg`;
const imgShieldCheck = `${assetPathPrefix}/8878d.svg`;
const imgInfo = `${assetPathPrefix}/30180.svg`;
const imgSelector = `${assetPathPrefix}/4e6f4.svg`;
const imgSelector1 = `${assetPathPrefix}/56fc8.svg`;
const imgStatus1 = `${assetPathPrefix}/8d6a0.svg`;
import "./Performance.css";


export default function App() {
  return (
    <div className="performance">
      <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex h-[64px] items-center justify-between overflow-clip px-[32px] relative shrink-0 w-full">
        <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0">
          <div className="relative shrink-0 size-[8px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStatus} />
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[11px] whitespace-nowrap">
            Secure Mother Care workspace
          </p>
        </div>
        <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0">
          <div className="bg-[#dcece6] content-stretch flex items-center justify-center overflow-clip relative rounded-[999px] shrink-0 size-[34px]">
            <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#2e7166] text-[10px] whitespace-nowrap">
              MS
            </p>
          </div>
          <div className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[0] not-italic relative shrink-0 text-[#20312e] text-[0px] whitespace-nowrap">
            <p className="leading-[1.35] mb-0 text-[10px]">Morgan Shaw</p>
            <p className="font-['Inter:Medium'] font-medium leading-[1.35] text-[#5c6b64] text-[9px]">Admin</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px overflow-clip pb-[28px] pt-[24px] px-[32px] relative w-full">
        <div className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full">
          <div className="[word-break:break-word] flex-[1_0_0] font-['Lora:Bold'] font-bold leading-[0] min-w-px relative text-[#20312e] text-[0px]">
            <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[1.12] mb-0 not-italic text-[#2e7166] text-[10px]">ADMIN WORKSPACE</p>
            <p className="leading-[1.12] text-[28px]">Program performance</p>
          </div>
          <div className="bg-[#1d3b34] border border-[rgba(0,0,0,0)] border-solid content-stretch flex gap-[8px] h-[38px] items-center overflow-clip px-[14px] relative rounded-[10px] shrink-0">
            <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
              Generate report
            </p>
            <div className="relative shrink-0 size-[13px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
            </div>
          </div>
        </div>
        <div className="bg-[#f3eedf] content-stretch flex gap-[10px] items-center min-h-[42px] overflow-clip px-[13px] py-[10px] relative rounded-[10px] shrink-0 w-full">
          <div className="relative shrink-0 size-[16px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldCheck} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.4] min-w-px not-italic relative text-[#20312e] text-[10px]">
            Organization-wide analytics use de-identified aggregates by default. Exports inherit your admin permissions and are logged.
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex gap-[12px] items-start leading-[normal] relative shrink-0 w-full">
          {[
            { label: "DUE TODAY", value: "18", sub: "Program tasks and reviews" },
            { label: "OVERDUE", value: "7", sub: "Across 4 counties" },
            { label: "AWAITING MOTHER", value: "31", sub: "Open confirmations" },
            { label: "COMPLETED", value: "486", sub: "+12.4% vs last month" },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-[96px] items-start min-w-px overflow-clip p-[14px] relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]">
              <p className="font-['Inter:Extra_Bold'] font-extrabold not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full">{m.label}</p>
              <p className="font-['Lora:Bold'] font-bold relative shrink-0 text-[#20312e] text-[24px] w-full">{m.value}</p>
              <p className="font-['Inter:Regular'] font-normal not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full">{m.sub}</p>
            </div>
          ))}
        </div>
        <div className="content-stretch flex gap-[16px] h-[780px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex h-full items-start relative shrink-0 w-[734px]">
            <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col h-[780px] items-start min-w-px overflow-clip relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-h-px overflow-clip p-[18px] relative w-full">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative">
                    <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full">
                      System engagement trend
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full">
                      Oct 1–31 · compared with prior 30 days
                    </p>
                  </div>
                  <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap">
                      +12.4%
                    </p>
                  </div>
                </div>
                <div className="bg-[#f7f5ee] content-stretch flex gap-[14px] h-[120px] items-end overflow-clip pt-[10px] px-[8px] relative rounded-[10px] shrink-0 w-full">
                  {[42, 58, 47, 72, 64, 86, 78].map((h, i) => (
                    <div key={i} className="bg-[#dcece6] flex-[1_0_0] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" style={{ height: h }} />
                  ))}
                  <div className="bg-[#2e7166] flex-[1_0_0] h-[94px] min-w-px relative rounded-tl-[4px] rounded-tr-[4px]" />
                </div>
                <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full">
                  {[
                    { label: "FORM COMPLETION", value: "84%", delta: "+6.2%" },
                    { label: "REFERRAL OUTCOMES", value: "71%", delta: "+3.8%" },
                    { label: "MOTHER ACTIVATION", value: "92%", delta: "+1.4%" },
                  ].map((m) => (
                    <div key={m.label} className="bg-[#f7f5ee] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip p-[12px] relative rounded-[10px]">
                      <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-full">{m.label}</p>
                      <div className="content-stretch flex items-start justify-between overflow-clip relative shrink-0 w-full">
                        <p className="[word-break:break-word] font-['Lora:Bold'] font-bold leading-[normal] relative shrink-0 text-[#20312e] text-[20px] whitespace-nowrap">{m.value}</p>
                        <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                          <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap">{m.delta}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-full">
                  <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full">
                    Counselor activity
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full">
                    Time comparison: current 30 days vs previous 30 days
                  </p>
                </div>
                <div className="[word-break:break-word] border border-[#e5eae7] border-solid content-stretch flex flex-col items-start leading-[0] not-italic overflow-clip relative rounded-[10px] shrink-0 w-full">
                  <div className="flex flex-col font-['Inter:Extra_Bold'] font-extrabold h-[34px] justify-center relative shrink-0 text-[#5c6b64] text-[9px] w-full">
                    <p className="leading-[normal] whitespace-pre-wrap px-[12px]">{`COUNSELOR   ·   MOTHERS   ·   ACTIONS   ·   OUTCOMES   ·   CHANGE`}</p>
                  </div>
                  <div className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#20312e] text-[10px] w-full whitespace-pre-wrap">
                    <p className="leading-[3.9] mb-0">{`   Alex Rivera   ·   28   ·   146   ·   89%   ·   +8%`}</p>
                    <p className="leading-[3.9] mb-0">{`   Dina Brooks   ·   24   ·   132   ·   86%   ·   +5%`}</p>
                    <p className="leading-[3.9]">{`   Sam Lee   ·   21   ·   118   ·   82%   ·   −2%`}</p>
                  </div>
                </div>
                <div className="bg-[#eaf2f6] content-stretch flex gap-[8px] items-start overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[14px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgInfo} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[#5c6b64] text-[9px]">
                    Activation = first secure client session. Outcome rate = confirmed successful or partially successful closures.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] h-full items-start min-w-px relative">
            <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] flex-col h-[780px] items-start min-w-px overflow-clip relative rounded-[16px] shadow-[0px_6px_18px_0px_rgba(22,52,46,0.07)]">
              <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex flex-col gap-[12px] items-start p-[18px] relative shrink-0 w-full">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-full">
                  <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full">{`Report Generation & Export Hub`}</p>
                  <p className="font-['Inter:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full">
                    Build a permission-aware program report.
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Bold'] font-bold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-[10px] w-full whitespace-nowrap">
                  <p className="relative shrink-0 text-[#5c6b64]">Prepared for</p>
                  <p className="relative shrink-0 text-[#20312e]">Morgan Shaw · Admin</p>
                </div>
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#5c6b64] text-[10px] whitespace-nowrap">
                    Data freshness
                  </p>
                  <div className="bg-[#e4f4ea] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[999px] shrink-0">
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#287653] text-[9px] whitespace-nowrap">
                      Live · 2 min ago
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-[#e5eae7] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px p-[18px] relative w-full">
                <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full">
                    Date range
                  </p>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex items-start min-h-[36px] overflow-clip px-[11px] py-[9px] relative rounded-[8px] shrink-0 w-full">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[#20312e] text-[11px]">
                      October 1–31, 2026
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0 w-full">
                  {[
                    { label: "Program", value: "All Mother Care programs" },
                    { label: "County", value: "Allegheny + 3" },
                  ].map((f) => (
                    <div key={f.label} className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative">
                      <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] w-full">{f.label}</p>
                      <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex items-start min-h-[36px] overflow-clip px-[11px] py-[9px] relative rounded-[8px] shrink-0 w-full">
                        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[1.45] min-w-px not-italic relative text-[#20312e] text-[11px]">{f.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#20312e] text-[10px] whitespace-nowrap">
                  Report format
                </p>
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="bg-[#edf6f2] border border-[#2e7166] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]">
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector} />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative">
                      <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full">CSV</p>
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full">Raw analysis</p>
                    </div>
                  </div>
                  <div className="bg-white border border-[#e5eae7] border-solid content-stretch flex flex-[1_0_0] gap-[9px] items-center min-w-px overflow-clip p-[10px] relative rounded-[8px]">
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSelector1} />
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative">
                      <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#20312e] text-[10px] w-full">PDF</p>
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5c6b64] text-[9px] w-full">Board-ready</p>
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] bg-[#f7f5ee] content-stretch flex flex-col gap-[7px] items-start leading-[normal] not-italic overflow-clip p-[12px] relative rounded-[10px] shrink-0 text-[10px] w-full whitespace-nowrap">
                  <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[#20312e]">Included summary</p>
                  {[
                    { k: "Mothers", v: "342 de-identified" },
                    { k: "Counselors", v: "18 active" },
                    { k: "Measures", v: "12 KPIs" },
                  ].map((r) => (
                    <div key={r.k} className="content-stretch flex font-['Inter:Bold'] font-bold items-center justify-between overflow-clip relative shrink-0 w-full">
                      <p className="relative shrink-0 text-[#5c6b64]">{r.k}</p>
                      <p className="relative shrink-0 text-[#20312e]">{r.v}</p>
                    </div>
                  ))}
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.45] min-w-full not-italic relative shrink-0 text-[#5c6b64] text-[9px] w-[min-content]">{`Sensitive notes and direct identifiers are excluded. This export will be recorded in Audit & settings.`}</p>
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-full">
                  <p className="font-['Inter:Extra_Bold'] font-extrabold leading-[normal] relative shrink-0 text-[#20312e] text-[15px] w-full">
                    Export history
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[1.4] relative shrink-0 text-[#5c6b64] text-[10px] w-full">
                    {"Sep 30 · Monthly impact · PDF · Morgan Shaw\nSep 15 · Referral outcomes · CSV · Priya Nair"}
                  </p>
                </div>
              </div>
              <div className="bg-[#122c27] content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[18px] relative shrink-0 w-full">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full">
                  <div className="relative shrink-0 size-[8px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStatus1} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-px not-italic relative text-[#d8eee7] text-[10px]">
                    ⚡ Report validation passed
                  </p>
                </div>
                <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter:Extra_Bold'] font-extrabold h-[42px] items-center justify-between leading-[normal] not-italic overflow-clip px-[14px] relative rounded-[10px] shrink-0 text-[#1d3b34] w-full">
                  <p className="flex-[1_0_0] min-w-px relative text-[11px]">Download CSV / PDF Report</p>
                  <p className="relative shrink-0 text-[13px] whitespace-nowrap">↗</p>
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#9fc6bc] text-[9px] w-full">
                  ⚡ Export is permission checked and added to the audit log
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
