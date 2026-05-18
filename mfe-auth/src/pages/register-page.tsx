import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaperForm,
  TitleForm,
  BoxForm,
  FieldForm,
  AlertError,
  Button,
  CircularLoading,
} from '@app/shared-ui';
import { useRegisterMutation } from '@app/shared-auth';
import { registerSchema, TRegisterFormData } from '@/schemas/register-schema';

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const registerMutation = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: TRegisterFormData) {
    try {
      await registerMutation.mutateAsync(data);
      navigate('/login');
    } catch {
      return;
    }
  }

  return (
    <PaperForm>
      <TitleForm>{t('common.register')}</TitleForm>

      <BoxForm onSubmit={handleSubmit(onSubmit)}>
        {registerMutation.error ? <AlertError>{t('register.error')}</AlertError> : null}

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FieldForm
              {...field}
              label={t('common.emailLabel')}
              type="email"
              required
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email ? t('common.emailHelper') : ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FieldForm
              {...field}
              label={t('common.passwordLabel')}
              type="password"
              required
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password ? t('common.passwordHelper') : ''}
            />
          )}
        />

        <Button variant="contained" type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? <CircularLoading /> : t('common.register')}
        </Button>
      </BoxForm>
    </PaperForm>
  );
}
