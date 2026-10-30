import DeploymentPreparationIllustrations from "./DeploymentPreparationIllustrations";
import styles from "./DeploymentPreparation.module.css";

export default function DeploymentPreparation() {
  return <section id="timeline" className={styles.section} aria-labelledby="timeline-title">
    <span id="origination" className={styles.anchor} aria-hidden="true" />
    <div className={styles.copy}>
      <h2 id="timeline-title">Start with what you have.</h2>
      <p>You don’t need every piece in place to get started.</p>
      <p>Bring us your compute requirements and any equipment or site options you’re considering, we’ll help fill the gaps.</p>
    </div>
    <DeploymentPreparationIllustrations />
  </section>;
}
