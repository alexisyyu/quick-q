import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/QuickQ.png"
        alt="QuickQ Logo"
        width={160}
        height={40}
        loading="lazy"
      />
    </Link>
  );
}
