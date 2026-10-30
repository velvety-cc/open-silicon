import EnterprisePagePresentation from "@/components/EnterprisePagePresentation";
import styles from "@/components/EnterprisePage.module.css";
import EnterpriseHero from "@/components/EnterpriseHero";
import EnterpriseProcess from "@/components/EnterpriseProcess";
import DeploymentDiagram from "@/components/DeploymentDiagram";
import DeploymentPreparation from "@/components/DeploymentPreparation";
import SiteFrame from "@/components/SiteFrame";
import DeploymentEstimator from "@/components/DeploymentEstimator";
import EnterpriseFaq from "@/components/EnterpriseFaq";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("For Startups and Enterprises", "GPU equipment financing, deal origination and deployment support for startups and enterprises.", "/startups-and-enterprises");

export default function StartupsAndEnterprises() {
  return (
    <EnterprisePagePresentation>
      <SiteFrame className="enterprise-site">
        <EnterpriseHero />
        <div className={styles.body}>
          <EnterpriseProcess withDiagram={false} />
        </div>
        <section id="deployment-layers" className={`${styles.shadedBand} ${styles.diagramSection}`} aria-label="Deployment layers">
          <DeploymentDiagram theme="neutral" />
        </section>
        <div className={styles.body}>
          <DeploymentPreparation />
        </div>
        <div className={styles.shadedBand}>
          <div className={styles.body}>
            <DeploymentEstimator />
          </div>
        </div>
        <div className={styles.body}>
          <EnterpriseFaq />
        </div>
      </SiteFrame>
    </EnterprisePagePresentation>
  );
}
