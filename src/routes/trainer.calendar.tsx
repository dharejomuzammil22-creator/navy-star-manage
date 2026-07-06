import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";

export const Route = createFileRoute("/trainer/calendar")({
  component: () => (
    <>
      <PageHeader title="Calendar" subtitle="Your classes and important dates." />
      <SectionCard title="July 2026">
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {["S","M","T","W","T","F","S"].map((d,i)=>(
            <div key={i} className="text-xs uppercase text-muted-foreground">{d}</div>
          ))}
          {Array.from({length:35}).map((_,i)=>{
            const day = i-2;
            const isClass = day>0 && [1,3,5,8,10,12,15,17,19,22,24,26,29,31].includes(day);
            const isExam = day===26;
            return (
              <div key={i} className={`aspect-square rounded-lg border border-border p-2 text-left text-xs ${day<=0?"opacity-30":""}`}>
                <div className="font-medium">{day>0?day:""}</div>
                {isExam && <div className="mt-1 rounded bg-gold/30 px-1 text-[10px]">Final Exam</div>}
                {isClass && !isExam && <div className="mt-1 rounded bg-primary/15 text-primary px-1 text-[10px]">Class</div>}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </>
  ),
});
