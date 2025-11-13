import React, { useEffect, useState } from "react";
import { Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { FaRocket } from "react-icons/fa";
import * as minecraft from "../../bindings/github.com/liteldev/LeviLauncher/minecraft";

export default function UpdatingPage() {
  const { t } = useTranslation();
  const [running, setRunning] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      try {
        setRunning(true);
        setError("");
        const ok = await minecraft?.Update?.();
        if (!ok) {
          setError("UPDATE_FAILED");
        }
      } catch (e: any) {
        setError(String(e?.message || e || "UPDATE_FAILED"));
      } finally {
        setRunning(false);
      }
    };
    run();
  }, []);

  return (
    <div className="relative w-full h-full px-6 py-6">
      <Card className="rounded-3xl shadow-xl bg-white/60 dark:bg-black/30 backdrop-blur-md border border-white/30">
        <CardBody className="p-6">
          <div className="flex items-center gap-2 text-primary-600 mb-3">
            <FaRocket className="w-5 h-5" />
            <span>{t("updating.title", { defaultValue: "正在更新 LeviLauncher" }) as string}</span>
          </div>
          <div className="text-default-700 text-sm">
            {t("updating.body", { defaultValue: "正在请求管理员权限并执行更新，请在系统提示中选择“是”。更新期间请勿关闭窗口。" }) as string}
          </div>
          <div className="mt-3">
            <Progress isIndeterminate aria-label="updating" className="w-full" />
          </div>
        </CardBody>
      </Card>

      <Modal size="md" isOpen={!!error} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-danger-600">
                {t("updating.failed_title", { defaultValue: "更新失败" }) as string}
              </ModalHeader>
              <ModalBody>
                <div className="text-default-700 text-sm break-words whitespace-pre-wrap">{error}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t("common.confirm", { defaultValue: "确定" }) as string}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

