"use client";

import { BrandWordmark } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

import { useState } from "react";
import Image from "next/image";

const offerings = [
  { id: "OS-001", name: "H200 Compute Campus", region: "Virginia, US", user: "Anthropic", regionMap: "virginia", gpu: "H200", hardwareImage: "dgx-h100-h200-studio", hardwareAlt: "NVIDIA DGX H100/H200 family rack-mount system illustration", hardware: "2,048 NVIDIA H200 GPUs", rate: 10.2, months: 24, size: 32, raised: 24, type: "GPU-backed credit" },
  { id: "OS-002", name: "Nordic AI Infrastructure", region: "Luleå, Sweden", user: "Mistral AI", regionMap: "sweden", gpu: "B200", hardwareImage: "dgx-b200-studio", hardwareAlt: "NVIDIA DGX B200 rack-mount system illustration", hardware: "1,024 NVIDIA B200 GPUs", rate: 9.6, months: 30, size: 48, raised: 29, type: "Data center credit" },
  { id: "OS-003", name: "Inference Cluster III", region: "Oregon, US", user: "AI inference provider", regionMap: "oregon", gpu: "H100", hardwareImage: "dgx-h100-h200-studio", hardwareAlt: "NVIDIA DGX H100 rack-mount system illustration", hardware: "1,536 NVIDIA H100 GPUs", rate: 11.1, months: 18, size: 18, raised: 11, type: "GPU-backed credit" },
];
const dollars = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function ComputeUser({ name }: { name: string }) {
  const logo = name === "Anthropic" ? { src: "/logos/anthropic.svg", width: 35, height: 24 } : name === "Mistral AI" ? { src: "/logos/mistral.svg", width: 21, height: 15 } : null;
  return <span className="compute-user-brand">{logo && <Image src={logo.src} width={logo.width} height={logo.height} alt="" className="compute-user-logo" />}<span>{name}</span></span>;
}

export default function LoanMarketplace() {
  const [selectedId, setSelectedId] = useState(offerings[0].id);
  const selected = offerings.find((loan) => loan.id === selectedId) ?? offerings[0];
  const [amount, setAmount] = useState("10000");
  const investment = Number(amount);
  const validAmount = amount.trim() !== "" && Number.isFinite(investment) && investment >= 1000 && investment <= (selected.size - selected.raised) * 1000000;

  return (
    <Dialog><Card className="loan-app">
      <CardHeader className="loan-app-header"><BrandWordmark className="loan-app-brand" /><Badge variant="secondary" className="loan-demo-badge">Product preview</Badge></CardHeader>
      <div className="loan-app-toolbar"><div><span className="loan-eyebrow">THE MARKETPLACE</span><h3>Find your next allocation.</h3></div><span className="loan-count">03 offerings</span></div>
      <CardContent className="loan-app-body">
        <div className="loan-list" role="group" aria-label="Choose an illustrative loan offering">
          {offerings.map((loan) => (
            <Button variant="card" size="card" type="button" className={`loan-option${selected.id === loan.id ? " is-selected" : ""}`} key={loan.id} aria-pressed={selected.id === loan.id} onClick={() => setSelectedId(loan.id)}>
              <span className="loan-card-heading">
                <span className="loan-card-copy"><span className="loan-option-top">{loan.type}</span><strong>{loan.name}</strong><span className="loan-region">{loan.region}</span></span>
                <Image className="loan-region-map" src={`/maps/${loan.regionMap}.svg`} width={480} height={300} alt={`Regional map of ${loan.region}, with the illustrative project location marked`} />
              </span>
              <span className="loan-option-metrics"><span><b>{loan.rate.toFixed(1)}%</b><small>Target APR</small></span><span><b>{loan.months} mo</b><small>Term</small></span><span><b>${loan.size}M</b><small>Facility</small></span></span>
              <span className="loan-end-user">Compute user <ComputeUser name={loan.user} /></span>
            </Button>
          ))}
        </div>
        <Card className="loan-detail">
          <div className="loan-detail-top"><span className="loan-eyebrow">{selected.id} / SENIOR SECURED</span><Badge variant="outline" className="loan-open">Open</Badge></div>
          <h4>{selected.name}</h4><p className="loan-detail-location">{selected.region}</p>
          <div className="loan-hardware-overview">
            <div className="loan-rate"><strong>{selected.rate.toFixed(1)}<span>%</span></strong><span>Target annual rate</span></div>
            <figure className="loan-hardware" data-model={selected.gpu}>
              <div className="loan-hardware-image"><Image key={selected.hardwareImage} src={`/hardware/${selected.hardwareImage}.webp`} alt={selected.hardwareAlt} fill sizes="(max-width: 380px) 108px, 150px" quality={90} /></div>
              <figcaption>NVIDIA {selected.gpu}<span>System illustration</span></figcaption>
            </figure>
          </div>
          <dl className="loan-terms"><div><dt>Compute user</dt><dd><ComputeUser name={selected.user} /></dd></div><div><dt>Loan term</dt><dd>{selected.months} months</dd></div><div><dt>Interest payments</dt><dd>Monthly</dd></div><div><dt>Collateral</dt><dd>Hardware + receivables</dd></div><div><dt>Minimum investment</dt><dd>$1,000</dd></div></dl>
          <div className="loan-funding"><div><span>${selected.raised}M allocated</span><span>${selected.size}M</span></div><Progress value={selected.raised / selected.size * 100} className="loan-progress" aria-label="Illustrative facility allocation" /></div>
          <DialogTrigger asChild><Button type="button" className="loan-invest">Preview investment</Button></DialogTrigger>
          <p className="loan-detail-note">Illustrative terms · No live investment</p>
        </Card>
      </CardContent>
      <DialogContent className="loan-dialog">
        <Badge variant="secondary" className="loan-demo-badge">Investment preview</Badge>
        <DialogTitle>{selected.name}</DialogTitle>
        <DialogDescription>{selected.hardware}</DialogDescription>
        <Label htmlFor="preview-amount">Your allocation (USD)</Label>
        <Input id="preview-amount" type="number" min="1000" max={(selected.size - selected.raised) * 1000000} step="any" value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby="preview-calculation" aria-invalid={!validAmount} />
        <div id="preview-calculation" className="loan-preview-calculation" aria-live="polite">{validAmount ? <><span>Illustrative monthly interest</span><strong>{dollars(investment * selected.rate / 100 / 12)}</strong><p>{selected.rate.toFixed(1)}% simple annual interest over {selected.months} months, before fees or losses. Principal is assumed repaid at maturity.</p></> : <p>Enter an amount between $1,000 and {dollars((selected.size - selected.raised) * 1000000)}.</p>}</div>
        <p className="loan-preview-disclaimer">Demo only. Projects, terms and compute-user relationships are hypothetical. This preview does not place an order.</p>
      </DialogContent>
    </Card></Dialog>
  );
}
