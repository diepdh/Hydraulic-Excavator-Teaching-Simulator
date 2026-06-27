import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Hydraulic Excavator Teaching Simulator</h1>
        <div>MVP v1.0.0</div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.sceneArea}>
          <div className={styles.scenePlaceholder}>
            [Simulation Scene Placeholder - SVG Canvas]
          </div>
          <div className={styles.telemetryPlaceholder}>
            [Telemetry Panel Placeholder - Reach, Height, Hydraulics]
          </div>
        </div>
        
        <aside className={styles.sidebar}>
          <div className={styles.sidebarPlaceholder}>
            [Control Panel & Warnings Sidebar Placeholder]
          </div>
        </aside>
      </main>
      
      <footer className={styles.footer}>
        <div>Trạng thái: IDLE</div>
        <div className={styles.disclaimer}>
          ⚠️ Mô hình đơn giản hóa giáo dục — chưa dùng cho thiết kế hoặc vận hành máy thật.
        </div>
        <div>Local Mode</div>
      </footer>
    </div>
  )
}

export default App
