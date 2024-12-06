import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
                                status,
                                canResetPassword,
                              }: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {/* Status Message */}
      {status && (
        <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 border border-green-400 rounded p-2">
          {status}
        </div>
      )}

      <form
        onSubmit={submit}
        className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center">
          <Checkbox
            name="remember"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Remember me
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Link
              href={route('register')}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Not registered? Register now
            </Link>
          </div>

          {canResetPassword && (
            <div>
              <Link
                href={route('password.request')}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            disabled={processing}
          >
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
