import DeploymentDiagram from "./DeploymentDiagram";
import styles from "./EnterpriseProcess.module.css";

export default function EnterpriseProcess({ withDiagram = true }: { withDiagram?: boolean }) {
  return <section id="process" className={styles.section} aria-labelledby="process-title">
    <div className={styles.copy}>
      <h2 id="process-title">Speed Matters</h2>
      <p className={styles.lead}>As founders ourselves, we know how important speed is to you.</p>
      <p>A deployment works when the equipment, energized site, and capital are aligned, and we help turn these pieces into a financeable transaction, fast.</p>
      <p>As your dedicated compute partner, we bring <strong>speed, structure, and clarity</strong>: a fast answer, a structure that fits your goal, and terms you can act on.</p>
    </div>
    {withDiagram && <DeploymentDiagram />}
  </section>;
}
