const features = [
  {
    title: 'Анализ договоров за минуты',
    text: 'Проверяйте NDA, MSA и оферты по вашим политикам. Prompt Flow выявляет риски, расхождения и спорные формулировки.',
  },
  {
    title: 'Генерация юридических документов',
    text: 'Создавайте претензии, правовые заключения, шаблоны писем и ответы регуляторам в едином стандарте команды.',
  },
  {
    title: 'Контроль комплаенса',
    text: 'Автоматизируйте внутренние проверки, храните историю изменений и повышайте готовность к аудиту.',
  },
]

export function App() {
  return (
    <div className="min-h-screen bg-stone text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 34 34" className="rounded-lg bg-accent/10 p-1">
            <path d="M6 11h22M6 17h16M6 23h12" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="23" r="4" fill="none" stroke="#1d4ed8" strokeWidth="2" />
          </svg>
          <span className="text-lg font-semibold">Prompt Flow</span>
        </div>
        <button className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Запросить демо</button>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-8 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Legal AI Platform
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">ИИ-платформа Prompt Flow для юридических команд</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Ускоряйте правовую экспертизу, снижайте операционные издержки и повышайте качество юридической работы без компромиссов по безопасности.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-xl bg-accent px-5 py-3 font-medium text-white hover:bg-blue-700">Начать пилот</button>
              <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium hover:border-slate-400">Посмотреть кейсы</button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Что получает юридический отдел</h2>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.title} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">{feature.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{feature.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <h3 className="text-2xl font-bold">Юридический фокус по умолчанию</h3>
            <p className="mt-3 max-w-3xl text-slate-600">
              Prompt Flow создан для in-house юристов, legal ops и консалтинговых практик: поддержка регуляторных требований, трассируемость решений, ролевой доступ и готовность к аудиту.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
