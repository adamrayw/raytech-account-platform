import Image from "next/image";

type RayTechAccountLogoProps = {
  className?: string;
  priority?: boolean;
};

export function RayTechAccountLogo({
  className = "h-12 w-auto",
  priority = false,
}: RayTechAccountLogoProps) {
  return (
    <Image
      src="/brand/raytech-account-logo.png"
      alt="RayTech Account"
      width={640}
      height={240}
      className={className}
      priority={priority}
    />
  );
}
