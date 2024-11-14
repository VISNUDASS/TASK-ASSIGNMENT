// SafetyMeasures.js
import React from 'react';

const Safety = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Safety Measures</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ol className="list-decimal pl-5 space-y-4">
          <li><strong>Data Breaches:</strong> Implement strong encryption for data at rest and in transit, use multi-factor authentication (MFA), and regularly update security protocols.</li>
          <li><strong>Phishing Attacks:</strong> Train employees on recognizing phishing attempts, use anti-phishing tools, and regularly update security software.</li>
          <li><strong>Malware Infections:</strong> Use reputable antivirus software, keep all systems updated, and regularly back up data.</li>
          <li><strong>Unpatched Vulnerabilities:</strong> Regularly apply patches and updates, use vulnerability management tools, and perform routine security audits.</li>
          <li><strong>Insecure APIs:</strong> Implement secure coding practices, use API gateways, and regularly test APIs for vulnerabilities.</li>
          <li><strong>Insider Threats:</strong> Implement least privilege access, monitor user activities, and conduct regular security training.</li>
          <li><strong>Network Attacks:</strong> Use firewalls, intrusion detection/prevention systems, and ensure network segmentation.</li>
          <li><strong>Configuration Errors:</strong> Follow best practices for system configurations, use automated configuration management tools, and regularly review configurations.</li>
          <li><strong>Poorly Managed Credentials:</strong> Use password managers, enforce strong password policies, and implement MFA.</li>
          <li><strong>Data Loss:</strong> Implement regular data backups, use redundant storage solutions, and test backup recovery procedures.</li>
          <li><strong>Uncontrolled Changes:</strong> Use change management processes, document changes, and perform regular audits.</li>
          <li><strong>Code Vulnerabilities:</strong> Implement secure coding practices, conduct regular code reviews, and use automated code analysis tools.</li>
          <li><strong>Lack of Monitoring:</strong> Implement comprehensive monitoring and logging, use SIEM (Security Information and Event Management) systems, and set up alerts for unusual activities.</li>
          <li><strong>Insecure Development Practices:</strong> Adopt secure development methodologies (e.g., DevSecOps), perform regular security testing, and involve security teams early in the development cycle.</li>
          <li><strong>Third-Party Risks:</strong> Assess third-party security practices, use vendor risk management tools, and establish secure integration practices.</li>
          <li><strong>Lack of Incident Response Planning:</strong> Develop and maintain an incident response plan, conduct regular drills, and ensure team members are trained.</li>
          <li><strong>Social Engineering:</strong> Educate employees on social engineering tactics, use security awareness training, and enforce verification procedures.</li>
          <li><strong>Insecure Mobile Devices:</strong> Implement mobile device management (MDM) solutions, enforce security policies for mobile devices, and ensure devices are regularly updated.</li>
          <li><strong>Weak Network Segmentation:</strong> Implement network segmentation strategies, use VLANs (Virtual Local Area Networks), and enforce access controls between segments.</li>
          <li><strong>Lack of Encryption:</strong> Use encryption for all sensitive data, including data at rest, in transit, and during processing, and ensure encryption protocols are up-to-date.</li>
        </ol>
      </div>
    </div>
  );
};

export default Safety;
