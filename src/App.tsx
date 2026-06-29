import { useSimulationStore } from './store/simulationStore';
import { SimulationScene } from './components/SimulationScene/SimulationScene';
import { TelemetryPanel } from './components/TelemetryPanel/TelemetryPanel';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { WarningPanel } from './components/WarningPanel/WarningPanel';
import styles from './App.module.css';

function App() {
  const simStatus = useSimulationStore((state) => state.simStatus);
  const mode = useSimulationStore((state) => state.mode);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Hydraulic Excavator Teaching Simulator</h1>
        <div className={styles.metaRow}>
          <span className={styles.badge}>MVP v1.0.0</span>
          <span className={styles.badge}>{mode} MODE</span>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.sceneArea}>
          <SimulationScene />
          <TelemetryPanel />
        </div>
        
        <aside className={styles.sidebar}>
          <ControlPanel />
          <WarningPanel />
        </aside>
      </main>
      
      <footer className={styles.footer}>
        <div>Trạng thái: <strong className={styles.statusVal}>{simStatus}</strong></div>
        <div className={styles.disclaimer}>
          ⚠️ Mô hình đơn giản hóa giáo dục — chưa dùng cho thiết kế hoặc vận hành máy thật.
        </div>
        <div>Local Mode</div>
      </footer>
    </div>
  );
}

export default App;
