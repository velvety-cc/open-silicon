import Image from "next/image";

export default function ComputeTenant({ name }: { name: string }) {
  const logo = name === "Anthropic"
    ? { src: "/logos/anthropic.svg", width: 35, height: 24 }
    : name === "Mistral AI"
      ? { src: "/logos/mistral.svg", width: 21, height: 15 }
      : null;

  return (
    <span className="compute-user-brand">
      {logo && <Image src={logo.src} width={logo.width} height={logo.height} alt="" className="compute-user-logo" />}
      <span>{name}</span>
    </span>
  );
}
