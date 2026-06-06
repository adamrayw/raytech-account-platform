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
      src="/brand/raytech-account-icon.png"
      alt="RayTech Account"
      width={560}
      height={560}
      className={className}
      priority={priority}
    />
  );
}
