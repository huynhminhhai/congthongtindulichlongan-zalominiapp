import React from 'react';
import { useStoreApp } from 'store/store';
import { Button, Modal } from 'zmp-ui';

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, title, message, onConfirm, onCancel }) => {
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  return (
    <Modal visible={visible} onClose={onCancel} title={title || t['ConfirmTitle']}>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>{message || t['ConfirmGenericActionMessage']}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Button onClick={onCancel} style={{ flex: 1, backgroundColor: '#f8f9fa', color: '#000' }}>
            {t['Cancel']}
          </Button>
          <Button onClick={onConfirm} style={{ flex: 1, backgroundColor: '#355933', color: '#fff' }}>
            {t['Confirm']}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
