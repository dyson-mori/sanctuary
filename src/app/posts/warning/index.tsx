"use client"

import { Button, Modal } from "@common";
import { Warning as WarningSvg } from "@svg";
import { useStorage } from "@hooks";

export default function Warning() {
  const [storage, setStorage] = useStorage('@warning', true);

  function handleOk() {
    setStorage(false);
  };

  return (
    <Modal open={storage} style={{ padding: '25px 25px' }}>
      <WarningSvg width={50} height={50} strokeWidth={2} />
      <div style={{ height: 10 }} />
      <h1>Aviso</h1>
      <div style={{ height: 20 }} />
      <p>No momento esse projeto está em desenvolvimento</p>
      <div style={{ height: 5 }} />
      <p>e infelizmente os <strong>uploads</strong> estão limitados.</p>
      <div style={{ height: 20 }} />
      <p>O foco inicial é vídeos curtos no máximo 30 segundos</p>
      <div style={{ height: 5 }} />
      <p>com o tempo vou melhorando isso.</p>
      <div style={{ height: 20 }} />
      <p>As regras estão sendo criadas, mas caso eu veja conteúdos</p>
      <div style={{ height: 5 }} />
      <p>que possa vir comprometer esse projeto, será excluido.</p>
      <div style={{ height: 20 }} />
      <p>Caso você queira contribuir com o projeto, <a href="https://www.google.com" target="_blank">clique aqui</a></p>
      <div style={{ height: 20 }} />

      <Button onClick={handleOk}>Entendi</Button>

      <div style={{ height: 10 }} />
      <p style={{ fontSize: 12 }}>v0.0.1</p>
    </Modal>
  )
};
