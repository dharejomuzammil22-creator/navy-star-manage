import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { quizzes } from "@/lib/mock-data";

export const Route = createFileRoute("/student/quiz")({
  component: () => (
    <>
      <PageHeader title="Quizzes" subtitle="Take quizzes and view results." />
      <div className="grid md:grid-cols-2 gap-4">
        {quizzes.map((q)=>(
          <div key={q.id} className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{q.course}</div>
            <div className="mt-1 font-display text-lg">{q.title}</div>
            <div className="mt-2 text-sm text-muted-foreground">{q.questions} questions · avg score {q.avg}%</div>
            <button className="mt-4 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">Start Quiz</button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <SectionCard title="Past Results">
          <ul className="divide-y divide-border">
            {[
              {q:"HTML & CSS Basics", score:"18/20"},
              {q:"Git Fundamentals", score:"15/20"},
              {q:"React Hooks", score:"17/20"},
            ].map((r)=>(
              <li key={r.q} className="py-3 flex items-center justify-between text-sm">
                <span>{r.q}</span>
                <span className="font-medium">{r.score}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  ),
});
