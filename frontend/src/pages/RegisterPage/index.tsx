import React, { useState, useRef } from 'react';
import styles from './RegisterPage.module.scss';
import { request } from '../../api';

interface FormData {
  primeiroNome: string;
  ultimoNome: string;
  alcool: string;
  foto: File | null;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    primeiroNome: '',
    ultimoNome: '',
    alcool: '',
    foto: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto: file
      }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.primeiroNome || !formData.ultimoNome || !formData.alcool) {
      setSubmitMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const alcoholValue = parseFloat(formData.alcool);
    if (isNaN(alcoholValue) || alcoholValue < 0) {
      setSubmitMessage('Por favor, insira um valor válido para o álcool.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('primeiro_nome', formData.primeiroNome);
      formDataToSend.append('ultimo_nome', formData.ultimoNome);
      formDataToSend.append('alcool', alcoholValue.toString());
      if (formData.foto) {
        formDataToSend.append('foto', formData.foto);
      }

      const response = await request('POST', '/person/create/', formDataToSend, true);

      if (response.success) {
        setSubmitMessage('Pessoa adicionada com sucesso!');
        // Reset form
        setFormData({
          primeiroNome: '',
          ultimoNome: '',
          alcool: '',
          foto: null
        });
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitMessage('Erro ao adicionar pessoa. Tente novamente.');
        console.error('Erro:', response.error);
      }
    } catch (error) {
      setSubmitMessage('Erro ao conectar com o servidor.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Adicionar Pessoa</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="primeiroNome" className={styles.label}>
              Primeiro Nome *
            </label>
            <input
              type="text"
              id="primeiroNome"
              name="primeiroNome"
              value={formData.primeiroNome}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Digite o primeiro nome"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ultimoNome" className={styles.label}>
              Último Nome *
            </label>
            <input
              type="text"
              id="ultimoNome"
              name="ultimoNome"
              value={formData.ultimoNome}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Digite o último nome"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="alcool" className={styles.label}>
              Nível de Álcool (mg/l) *
            </label>
            <input
              type="number"
              step="0.01"
              id="alcool"
              name="alcool"
              value={formData.alcool}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Digite o nível de álcool"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Foto</label>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoCapture}
              accept="image/*"
              capture="environment"
              className={styles.hiddenInput}
            />
            
            <button
              type="button"
              onClick={triggerFileInput}
              className={styles.photoButton}
            >
              {formData.foto ? 'Alterar Foto' : 'Tirar Foto'}
            </button>

            {previewUrl && (
              <div className={styles.photoPreview}>
                <img src={previewUrl} alt="Preview" className={styles.previewImage} />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Adicionando...' : 'Adicionar Pessoa'}
          </button>

          {submitMessage && (
            <div className={`${styles.message} ${submitMessage.includes('sucesso') ? styles.success : styles.error}`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
