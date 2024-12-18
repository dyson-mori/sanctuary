"use client"
import { FC } from "react";

import { Image as ImageSvg, Upload, Video } from "@svg";

import { Container, Progress, Pulse } from "./styles";

interface Props {
  step: number;
};

type StepProps = {
  pulse: 'active' | 'deactivate' | 'completed';
  stroke: string;
};

export const Proccess: FC<Props> = ({ step = 0 }) => {
  const firstStep: StepProps = {
    pulse: step === 0 ? 'active' : 'deactivate',
    stroke:
      step >= 1 ? '#41B06E' :
        step >= 0 ? '#F55D00' : '#AEAEAE',
  };

  const secondStep: StepProps = {
    pulse: step === 1 ? 'active' : 'deactivate',
    stroke:
      step >= 2 ? '#41B06E' :
        step >= 1 ? '#F55D00' : '#AEAEAE',
  };

  const thirdStep: StepProps = {
    pulse: step === 2 ? 'active' : 'deactivate',
    stroke:
      step >= 3 ? '#41B06E' :
        step >= 2 ? '#F55D00' : '#AEAEAE',
  };

  return (
    <Container>
      <Pulse background={firstStep.pulse}>
        <Video width={25} height={25} stroke={firstStep.stroke} strokeWidth={2} />
      </Pulse>

      <Progress progress={String(step >= 1)}>
        <span />
      </Progress>

      <Pulse background={secondStep.pulse}>
        <ImageSvg width={25} height={25} stroke={secondStep.stroke} strokeWidth={2} />
      </Pulse>

      <Progress progress={String(step === 2)}>
        <span />
      </Progress>

      <Pulse background={thirdStep.pulse}>
        <Upload width={25} height={25} stroke={thirdStep.stroke} strokeWidth={2} />
      </Pulse>
    </Container>
  )
};