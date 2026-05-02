import './index.css'

export function App() {
  return (
    <div className="page">
      <header className="header" id="top">
        <div className="container header-inner">
          <div className="brand">Prompt Flow</div>
          <nav className="nav">
            <a href="#services-legal">Для юристов</a>
            <a href="#services-business">Для бизнеса</a>
            <a href="#about">О нас</a>
            <a href="#request" className="btn btn-small">Оставить заявку</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Мини-студия услуг Prompt Flow</p>
              <h1>AI-инструменты для юристов и автоматизация малого бизнеса</h1>
              <p className="lead">
                Помогаем юристам, адвокатам и предпринимателям убрать ручную рутину из документов,
                таблиц, найма, клиентских ответов и внутренних процессов с помощью ИИ, Google Таблиц и no-code.
              </p>
              <p className="note">Мы не заменяем юриста — мы ускоряем подготовительную работу.</p>
              <a className="btn" href="#request">Обсудить задачу</a>
            </div>
            <div className="card hero-card">
              <h3>Что вы получаете</h3>
              <ul>
                <li>Понятные и внедряемые сценарии автоматизации без сложной разработки</li>
                <li>Ускорение повторяющихся юридических и операционных процессов</li>
                <li>Структуру работы: от диагностики до передачи готового решения</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="audience">
          <div className="container">
            <h2>Кому помогаем</h2>
            <div className="grid three">
              <article className="card"><h3>Юристам и адвокатам</h3><p>Систематизируем подготовку материалов, черновиков и доказательной базы.</p></article>
              <article className="card"><h3>Юридическим бутикам</h3><p>Собираем внутренние процессы в единый рабочий контур с прозрачными этапами.</p></article>
              <article className="card"><h3>Предпринимателям</h3><p>Автоматизируем рутинные операции в продажах, поддержке и документообороте.</p></article>
            </div>
          </div>
        </section>

        <section className="section alt" id="services-legal">
          <div className="container">
            <h2>AI-инструменты для юристов и адвокатов</h2>
            <div className="grid two">
              <article className="card"><h3>Черновики документов</h3><p>Настраиваем шаблоны и пайплайны для быстрого старта по искам, отзывам, претензиям и письмам.</p></article>
              <article className="card"><h3>Суммаризация материалов</h3><p>Автоматически выделяем факты, позиции сторон и риски из больших массивов документов.</p></article>
              <article className="card"><h3>Карточки дел</h3><p>Формируем структурированные карточки с ключевыми датами, статусами и перечнем задач.</p></article>
              <article className="card"><h3>Внутренние регламенты</h3><p>Собираем и обновляем стандарты юридической практики в удобной AI-базе знаний.</p></article>
            </div>
            <a className="btn" href="#request">Получить консультацию</a>
          </div>
        </section>

        <section className="section" id="pricing-legal">
          <div className="container">
            <h2>Форматы работы для юридической практики</h2>
            <div className="grid two pricing">
              <article className="card"><h3>Экспресс-разбор юридического процесса</h3><p className="price">от 14 900 ₽</p><p>Выявляем узкие места и точки ускорения за 1–2 сессии.</p></article>
              <article className="card"><h3>Карточка дела + таймлайн + реестр доказательств</h3><p className="price">от 39 900 ₽</p><p>Строим рабочую систему ведения дела с прозрачной логикой действий.</p></article>
              <article className="card"><h3>AI-база знаний для юридической команды</h3><p className="price">от 59 900 ₽</p><p>Объединяем шаблоны, практики и инструкции в единый контур.</p></article>
              <article className="card"><h3>Закрытая система подготовки черновиков</h3><p className="price">от 99 900 ₽</p><p>Настраиваем приватный поток подготовки документов под конкретную практику.</p></article>
            </div>
            <a className="btn" href="#request">Запросить расчёт</a>
          </div>
        </section>

        <section className="section alt" id="services-business">
          <div className="container">
            <h2>Автоматизация малого бизнеса</h2>
            <p>Создаём связки между формами, CRM, таблицами, почтой и мессенджерами, чтобы уменьшить ручную работу и ускорить обслуживание клиентов.</p>
            <a className="btn" href="#request">Обсудить автоматизацию</a>
          </div>
        </section>

        <section className="section" id="sheets">
          <div className="container">
            <h2>Google Таблицы + Apps Script</h2>
            <p>Разрабатываем таблицы как рабочие интерфейсы: автоматические статусы, отчёты, уведомления и синхронизация данных без перегруженных систем.</p>
          </div>
        </section>

        <section className="section alt" id="hr">
          <div className="container">
            <h2>HR-автоматизация</h2>
            <p>Настраиваем сбор откликов, скоринг кандидатов, шаблоны коммуникации и базовую аналитику найма в едином процессе.</p>
          </div>
        </section>

        <section className="section" id="assistant">
          <div className="container">
            <h2>AI-ассистент по подписке</h2>
            <p>Берём на сопровождение ваши регулярные AI-сценарии: поддержка, доработка, контроль качества и развитие под новые задачи.</p>
          </div>
        </section>

        <section className="section alt" id="nocode">
          <div className="container">
            <h2>No-code AI-инструменты</h2>
            <p>Собираем решения на конструкторах и интеграторах без тяжёлой разработки, чтобы запускать полезные инструменты в короткие сроки.</p>
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <h2>Как проходит работа</h2>
            <ol className="steps">
              <li>Заявка и короткое интервью по текущему процессу.</li>
              <li>Диагностика и предложение решения с этапами.</li>
              <li>Сборка, тестирование и внедрение.</li>
              <li>Передача инструкций и сопровождение.</li>
            </ol>
          </div>
        </section>

        <section className="section alt" id="privacy">
          <div className="container">
            <h2>Конфиденциальность</h2>
            <p>Работаем с учётом чувствительности данных, ограничиваем доступы и отдельно согласуем правила хранения материалов проекта.</p>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <h2>О нас</h2>
            <p>Prompt Flow — мини-студия услуг по внедрению AI- и no-code-автоматизации для юридической практики и малого бизнеса. Работаем проектно и в формате сопровождения.</p>
            <a className="btn" href="#request">Связаться с нами</a>
          </div>
        </section>

        <section className="section alt" id="request">
          <div className="container">
            <h2>Форма заявки</h2>
            <form className="request-form" onSubmit={(e) => e.preventDefault()}>
              <label>Имя<input type="text" placeholder="Ваше имя" required /></label>
              <label>Контакт<input type="text" placeholder="Телефон или Telegram" required /></label>
              <label>Описание задачи<textarea placeholder="Кратко опишите задачу" rows={4} required /></label>
              <button className="btn" type="submit">Отправить заявку</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Prompt Flow. Мини-студия услуг автоматизации.</p>
          <p>Юридический адрес: 195213, г. Санкт-Петербург, пр. Шаумяна, д. 50, лит. «А», пом. 2-Н</p>
          <a href="#request">Оставить заявку</a>
        </div>
      </footer>
    </div>
  )
}

export default App
