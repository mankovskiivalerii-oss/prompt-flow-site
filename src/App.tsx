import { FormEvent, useState } from 'react'
import './index.css'

const FORM_ENDPOINT = 'https://formspree.io/f/xnjwjzkk'
const logoSrc = `${import.meta.env.BASE_URL}images/prompt-flow-logo.png`
const heroImageSrc = `${import.meta.env.BASE_URL}images/hero-abstract.jpg`

type Screen = 'cases' | 'overview' | 'procedureMap' | 'documents'

type CreatedLegalCaseItem = {
  id: string
  number: string
  plaintiff: string
  defendant: string
  clientRole: string
  processType: string
  category: string
  status: string
  documentsCount: number
  risksCount: number
  updatedAt: string
}


export function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [screen, setScreen] = useState<Screen>('cases')
  const pilotLegalCase: CreatedLegalCaseItem = {
    id: 'a56-95529-2025',
    number: 'A56-95529/2025',
    plaintiff: 'ООО «ТЛЦ»',
    defendant: 'ООО «НафтаТранс»',
    clientRole: 'ответчик',
    processType: 'гражданское / арбитражное',
    category: 'транспортно-экспедиционный спор',
    status: 'анализ выполнен',
    documentsCount: 15,
    risksCount: 5,
    updatedAt: 'сегодня',
  }
  const [createdLegalCases, setCreatedLegalCases] = useState<CreatedLegalCaseItem[]>(() => {
    try {
      const raw = localStorage.getItem('legalCases')
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed)
        ? parsed.filter((legalCase) => legalCase?.id !== pilotLegalCase.id)
        : []
    } catch {
      return []
    }
  })
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState(false)
  const [newCaseForm, setNewCaseForm] = useState({
    number: '',
    plaintiff: '',
    defendant: '',
    clientRole: 'ответчик',
    processType: 'гражданское',
    category: '',
  })

  const allLegalCases = [...createdLegalCases, pilotLegalCase]
  const totalCasesCount = allLegalCases.length
  const isCreateCaseHintVisible =
    !newCaseForm.number.trim() || !newCaseForm.plaintiff.trim() || !newCaseForm.defendant.trim()

  const saveLegalCases = (nextCases: CreatedLegalCaseItem[]) => {
    setCreatedLegalCases(nextCases)
    localStorage.setItem('legalCases', JSON.stringify(nextCases))
  }

  const handleCreateCase = () => {
    const number = newCaseForm.number.trim()
    const plaintiff = newCaseForm.plaintiff.trim()
    const defendant = newCaseForm.defendant.trim()

    if (!number || !plaintiff || !defendant) {
      return
    }

    const id = `case-${Date.now()}`

    const nextCase: CreatedLegalCaseItem = {
      id,
      number,
      plaintiff,
      defendant,
      clientRole: newCaseForm.clientRole || 'не указана',
      processType: newCaseForm.processType || 'гражданское',
      category: newCaseForm.category.trim() || 'категория не указана',
      status: 'создано',
      documentsCount: 0,
      risksCount: 0,
      updatedAt: 'сегодня',
    }

    saveLegalCases([nextCase, ...createdLegalCases])

    setNewCaseForm({
      number: '',
      plaintiff: '',
      defendant: '',
      clientRole: 'ответчик',
      processType: 'гражданское',
      category: '',
    })

    setIsCreateCaseOpen(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus('idle')

    const form = event.currentTarget
    const formData = new FormData(form)

    formData.set('_subject', 'Новая заявка с сайта Prompt Flow')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset()
      } else {
        const errorText = await response.text()
        console.error('Formspree error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        })

        setFormStatus('error')
      }
    } catch (error) {
      console.error(error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page">
      <header className="header" id="top">
        <div className="container header-inner">
          <div className="brand" aria-label="Prompt Flow">
            <span className="brand-mark" aria-hidden="true"><img src={logoSrc} alt="" loading="eager" /></span>
            <span className="brand-text">Prompt Flow</span>
          </div>
          <nav className="nav">
            <button className="btn btn-small btn-ghost" type="button" onClick={() => setScreen('cases')}>Дела</button>
            <a href="#services-legal">Для юристов</a>
            <a href="#services-business">Для бизнеса</a>
            <a href="#about">О нас</a>
            <a href="#request" className="btn btn-small">Оставить заявку</a>
          </nav>
        </div>
      </header>

      <main>
        {screen === 'cases' && (
          <section className="section alt" id="cases">
            <div className="container">
              <header className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Дела</h2>
                    <p className="text-sm text-slate-500">
                      Дело № А56-95529/2025 · Ответчик: ООО «НафтаТранс»
                    </p>
                  </div>

                  {screen === 'cases' ? (
                    <div className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 sm:w-40">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Всего дел
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-slate-900">
                        {totalCasesCount}
                      </p>
                    </div>
                  ) : null}
                </div>
              </header>

              <div className="card">
                <p>Создавайте дела, фиксируйте процессуальный контекст и переходите к рабочим разделам дела.</p>
                <button className="btn" type="button" onClick={() => setIsCreateCaseOpen(true)}>Создать дело</button>
              </div>

              {isCreateCaseOpen && (
                <div className="card" style={{ marginTop: 20 }}>
                  <h3>Создание нового дела</h3>
                  <div className="request-form">
                    <label>Номер дела<input type="text" value={newCaseForm.number} onChange={(event) => setNewCaseForm({ ...newCaseForm, number: event.target.value })} placeholder="A56-00000/2026" /></label>
                    <label>Истец<input type="text" value={newCaseForm.plaintiff} onChange={(event) => setNewCaseForm({ ...newCaseForm, plaintiff: event.target.value })} placeholder="Наименование истца" /></label>
                    <label>Ответчик<input type="text" value={newCaseForm.defendant} onChange={(event) => setNewCaseForm({ ...newCaseForm, defendant: event.target.value })} placeholder="Наименование ответчика" /></label>
                    <label>Роль клиента<input type="text" value={newCaseForm.clientRole} onChange={(event) => setNewCaseForm({ ...newCaseForm, clientRole: event.target.value })} placeholder="ответчик" /></label>
                    <label>Тип процесса<input type="text" value={newCaseForm.processType} onChange={(event) => setNewCaseForm({ ...newCaseForm, processType: event.target.value })} placeholder="гражданское" /></label>
                    <label>Категория дела<input type="text" value={newCaseForm.category} onChange={(event) => setNewCaseForm({ ...newCaseForm, category: event.target.value })} placeholder="Категория спора" /></label>
                    {isCreateCaseHintVisible && <p className="form-message error">Заполните номер дела, истца и ответчика.</p>}
                    <div>
                      <button className="btn" type="button" onClick={handleCreateCase}>Создать дело</button>{' '}
                      <button className="btn btn-ghost" type="button" onClick={() => setIsCreateCaseOpen(false)}>Отмена</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-4">
                {allLegalCases.map((legalCase) => (
                  <div
                    key={legalCase.id}
                    className="w-full rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-slate-900">
                          Дело № {legalCase.number}
                        </p>
                        <p className="text-sm text-slate-700">
                          {legalCase.plaintiff} против {legalCase.defendant}
                        </p>
                        <p className="text-sm text-slate-500">
                          Роль клиента: {legalCase.clientRole}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          legalCase.status === 'анализ выполнен'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Статус: {legalCase.status}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-5">
                      <p>
                        <strong>Тип процесса:</strong>
                        <br />
                        {legalCase.processType}
                      </p>
                      <p>
                        <strong>Категория:</strong>
                        <br />
                        {legalCase.category}
                      </p>
                      <p>
                        <strong>Документов:</strong>
                        <br />
                        {legalCase.documentsCount}
                      </p>
                      <p>
                        <strong>Рисков:</strong>
                        <br />
                        {legalCase.risksCount}
                      </p>
                      <p>
                        <strong>Последнее обновление:</strong>
                        <br />
                        {legalCase.updatedAt}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setScreen('overview')}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                      >
                        Открыть дело
                      </button>

                      <button
                        type="button"
                        onClick={() => setScreen('procedureMap')}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        Процессуальная карта
                      </button>

                      <button
                        type="button"
                        onClick={() => setScreen('documents')}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        Документы
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {screen === 'overview' && <section className="section alt"><div className="container card"><h2>Обзор дела</h2><p>Раздел обзора дела открыт.</p><button className="btn btn-ghost" type="button" onClick={() => setScreen('cases')}>Вернуться к делам</button></div></section>}
        {screen === 'procedureMap' && <section className="section alt"><div className="container card"><h2>Процессуальная карта</h2><p>Раздел процессуальной карты открыт.</p><button className="btn btn-ghost" type="button" onClick={() => setScreen('cases')}>Вернуться к делам</button></div></section>}
        {screen === 'documents' && <section className="section alt"><div className="container card"><h2>Документы</h2><p>Раздел документов открыт.</p><button className="btn btn-ghost" type="button" onClick={() => setScreen('cases')}>Вернуться к делам</button></div></section>}

        <section className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Мини-студия услуг Prompt Flow</p>
              <h1>AI-инструменты для юристов и автоматизация малого бизнеса</h1>
              <p className="lead">Помогаем юристам, адвокатам и предпринимателям убрать ручную рутину из документов, таблиц, найма, клиентских ответов и внутренних процессов с помощью ИИ, Google Таблиц и no-code.</p>
              <p className="note">Мы не заменяем юриста — мы ускоряем подготовительную работу.</p>
              <a className="btn" href="#request">Обсудить задачу</a>
            </div>
            <div className="hero-right">
              <div className="card hero-card">
                <h3>Что вы получаете</h3>
                <ul>
                  <li>Понятные и внедряемые сценарии автоматизации без сложной разработки</li>
                  <li>Ускорение повторяющихся юридических и операционных процессов</li>
                  <li>Структуру работы: от диагностики до передачи готового решения</li>
                </ul>
              </div>
              <div className="hero-illustration" aria-hidden="true">
                <img src={heroImageSrc} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="audience"><div className="container"><h2>Кому помогаем</h2><div className="grid three"><article className="card"><h3>Юристам и адвокатам</h3><p>Систематизируем подготовку материалов, черновиков и доказательной базы.</p></article><article className="card"><h3>Коллегиям и компаниям</h3><p>Помогаем выстроить внутренние процессы, шаблоны, базы знаний и рабочие инструменты для коллегий адвокатов, юридических команд и компаний.</p></article><article className="card"><h3>Предпринимателям</h3><p>Автоматизируем рутинные операции в продажах, поддержке и документообороте.</p></article></div></div></section>

        <section className="section alt" id="services-legal"> <div className="container"><h2>AI-инструменты для юристов и адвокатов</h2><div className="grid two"><article className="card"><h3>Черновики документов</h3><p>Настраиваем шаблоны и пайплайны для быстрого старта по искам, отзывам, претензиям и письмам.</p></article><article className="card"><h3>Суммаризация материалов</h3><p>Автоматически выделяем факты, позиции сторон и риски из больших массивов документов.</p></article><article className="card"><h3>Карточки дел</h3><p>Формируем структурированные карточки с ключевыми датами, статусами и перечнем задач.</p></article><article className="card"><h3>Внутренние регламенты</h3><p>Собираем и обновляем стандарты юридической практики в удобной AI-базе знаний.</p></article></div><a className="btn" href="#request">Получить консультацию</a></div></section>

        <section className="section" id="pricing-legal"><div className="container"><h2>Форматы работы для юридической практики</h2><div className="grid two pricing"><article className="card"><h3>Экспресс-разбор юридического процесса</h3><p className="price">от 14 900 ₽</p><p>Выявляем узкие места и точки ускорения за 1–2 сессии.</p></article><article className="card"><h3>Карточка дела + таймлайн + реестр доказательств</h3><p className="price">от 39 900 ₽</p><p>Строим рабочую систему ведения дела с прозрачной логикой действий.</p></article><article className="card"><h3>AI-база знаний для юридической команды</h3><p className="price">от 59 900 ₽</p><p>Объединяем шаблоны, практики и инструкции в единый контур.</p></article><article className="card"><h3>Закрытая система подготовки черновиков</h3><p className="price">от 99 900 ₽</p><p>Настраиваем приватный поток подготовки документов под конкретную практику.</p></article></div><a className="btn" href="#request">Запросить расчёт</a></div></section>

        <section className="section alt" id="services-business"><div className="container"><h2>Автоматизация малого бизнеса</h2><p>Создаём связки между формами, CRM, таблицами, почтой и мессенджерами, чтобы уменьшить ручную работу и ускорить обслуживание клиентов.</p><div className="service-grid grid two"><article className="card service-card"><h3>Google Таблицы + Apps Script</h3><p>Автоматизируем заявки, оплаты, отчёты, KPI, смены, складской учёт и управленческие таблицы.</p><p className="service-meta"><strong>Что входит:</strong> структура таблиц, триггеры, уведомления и отчёты.</p><p className="price">От 19 900 ₽</p><a className="btn btn-ghost" href="#request">Заказать решение</a></article><article className="card service-card"><h3>HR-автоматизация</h3><p>Настраиваем воронку подбора: анкеты, фильтрацию, скоринг, шаблоны сообщений и таблицы кандидатов.</p><p className="service-meta"><strong>Что входит:</strong> формы отклика, оценка кандидатов, шаблоны коммуникаций.</p><p className="price">От 19 900 ₽</p><a className="btn btn-ghost" href="#request">Обсудить внедрение</a></article><article className="card service-card"><h3>AI-ассистент по подписке</h3><p>Берём на сопровождение регулярные AI-задачи бизнеса: тексты, документы, ответы клиентам, регламенты и шаблоны.</p><p className="service-meta"><strong>Что входит:</strong> ежемесячные задачи, контроль качества, развитие сценариев.</p><p className="price">От 19 900 ₽ / месяц</p><a className="btn btn-ghost" href="#request">Подключить сопровождение</a></article><article className="card service-card"><h3>No-code AI-инструменты</h3><p>Собираем простые рабочие инструменты: генераторы документов, калькуляторы, формы, внутренние mini-сервисы и AI-интерфейсы.</p><p className="service-meta"><strong>Что входит:</strong> прототип, интеграции, запуск и передача инструкции.</p><p className="price">От 39 900 ₽</p><a className="btn btn-ghost" href="#request">Запросить прототип</a></article></div></div></section>

        <section className="section" id="process"><div className="container"><h2>Как проходит работа</h2><ol className="steps"><li>Заявка и короткое интервью по текущему процессу.</li><li>Диагностика и предложение решения с этапами.</li><li>Сборка, тестирование и внедрение.</li><li>Передача инструкций и сопровождение.</li></ol></div></section>
        <section className="section alt" id="privacy"><div className="container"><h2>Конфиденциальность</h2><p>Работаем с учётом чувствительности данных, ограничиваем доступы и отдельно согласуем правила хранения материалов проекта.</p></div></section>
        <section className="section" id="about"><div className="container"><h2>О нас</h2><p>Prompt Flow — мини-студия услуг по внедрению AI- и no-code-автоматизации для юридической практики и малого бизнеса. Работаем проектно и в формате сопровождения.</p><a className="btn" href="#request">Связаться с нами</a></div></section>

        <section className="section alt" id="request"><div className="container"><h2>Форма заявки</h2><form className="request-form" onSubmit={handleSubmit}><label>Имя<input name="name" type="text" placeholder="Ваше имя" required /></label><label>Контакт<input name="contact" type="text" placeholder="Телефон или Telegram" required /></label><label>Описание задачи<textarea name="message" placeholder="Кратко опишите задачу" rows={4} required /></label><button className="btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Отправка…' : 'Отправить заявку'}</button>{formStatus === 'success' && <p className="form-message success">Сообщение отправлено</p>}{formStatus === 'error' && <p className="form-message error">Сообщение отправлено</p>}</form><p className="form-fallback-contact">Если форма не отправляется, напишите напрямую: mankovskiivalerii@gmail.com</p></div></section>
      </main>

      <footer className="footer"><div className="container"><p>© {new Date().getFullYear()} Prompt Flow. Мини-студия услуг автоматизации.</p><p>Юридический адрес: 195213, г. Санкт-Петербург, пр. Шаумяна, д. 50, лит. «А», пом. 2-Н</p><a href="#request">Оставить заявку</a><a href="https://workspace.ru/contractors/ip-mankovskiy-valeriy-vasilevich/" target="_blank" rel="noopener noreferrer" aria-label="Мы на Workspace"><img src="https://workspace.ru/local/tools/verification.php?code=80d9a4584d7f7ce33498ae36bb23b1e5&type=ver4" alt="Мы на Workspace" width="100" loading="lazy" /></a></div></footer>
    </div>
  )
}

export default App
