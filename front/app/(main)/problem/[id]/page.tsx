"use client"

import React from 'react';
import ProblemDetailPage from "@/components/ProblemDetailPage";
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  return <ProblemDetailPage />;
}
