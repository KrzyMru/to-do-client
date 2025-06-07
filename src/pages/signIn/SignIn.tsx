import { Link } from 'react-router';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { type SubmitHandler, useForm } from "react-hook-form";
import { signIn } from '../../api/AuthApi';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../contexts/ToastContext';
import { Settings } from '../../components/modals';
import type { SignInFormData } from '../../api/types';

const SignIn = () => {
    const { t } = useTranslation();
    const { openToast } = useContext(ToastContext);
    const { setToken } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [openSettings, setOpenSettings] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<SignInFormData> = async (formData) => {
        try {
            setLoading(true);
            const response = await signIn({ formData });
            setToken(response);
            openToast({
                type: 'success',
                title: t('pages.signIn.toast.success.title'),
            });
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('pages.signIn.toast.error.title'),
                text: t('pages.signIn.toast.error.text')
            });
        }
        finally {
            setLoading(false);
        }
    }

    const modals =
        <React.Fragment>
            {openSettings &&
                <Settings
                    open={openSettings}
                    onClose={() => setOpenSettings(false)}
                />
            }
        </React.Fragment>;

    const loadingOrError = loading || errors.email !== undefined || errors.password !== undefined;

    return (
        <div className="box-border rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 p-5 relative [transition:background-color_350ms,width_350ms]">
            <button
                className="absolute top-1 right-1 bg-sky-300 dark:bg-sky-400 rounded-lg lg:rounded-xl hover:cursor-pointer focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200 p-[2px] lg:p-[4px] group transition-[background-color_border-radius_width] duration-350 focus-visible:duration-0"
                onClick={() => setOpenSettings(true)}
                title={t('pages.signIn.buttonSettingsTitle')}
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-[18px] lg:size-[24px] shrink-0 fill-white group-hover:fill-gray-800 dark:fill-gray-800 dark:group-hover:fill-white transition-[width_height_fill] duration-350 hover:duration-100"
                >
                    <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"></path>
                </svg> 
            </button>
            <div className="flex justify-center p-2 pb-8 lg:p-4 lg:pb-12 [transition:padding_350ms]">
                <div className="px-2 lg:px-4 [transition:padding_350ms]">
                    <p className="text-center font-bold text-3xl lg:text-5xl text-gray-900 dark:text-white [transition:font-size_350ms,color_350ms]">{t('pages.signIn.headerStart')}</p>
                    <div className="flex flex-wrap lg:flex-nowrap justify-center">
                        <p className="text-center font-bold text-3xl lg:text-5xl text-gray-900 dark:text-white pr-2 lg:pr-3 transition-[font-size_color_padding-right] duration-350">{t('pages.signIn.headerYour')}</p>
                        <p className="text-center font-bold text-3xl lg:text-5xl text-sky-300 [transition:color_350ms,font-size_350ms]">{t('pages.signIn.headerAccount')}</p>
                    </div>
                    <div className="flex flex-wrap justify-center mt-2 lg:mt-3 [transition:margin_350ms]">
                        <p className="text-center text-sm lg:text-xl text-gray-900 dark:text-gray-300 pr-1 lg:pr-2 transition-[font-size_color_padding-right] duration-350">{t('pages.signIn.noAccount')}</p>
                        <Link to="/signUp" className='focus-visible:outline-3 focus-visible:outline-slate-700 dark:focus-visible:outline-slate-200'>
                            <p className="text-sm lg:text-xl text-blue-400 [transition:font-size_350ms]">{t('pages.signIn.signUp')}</p>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-[56px] lg:size-[78px] [transition:width_350ms,height_350ms]"
                        fill="url(#grad1)"
                    >
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#0EA5E9', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#A5F3FC', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#BAE6FD', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <path d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21h-7Zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5l-5 5Z" />
                    </svg>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:space-y-6 [&>*:not(p)]:[transition:margin_350ms]">
                <Input
                    type="email"
                    required
                    placeholder={t('pages.signIn.emailPlaceholder')}
                    error={errors.email !== undefined}
                    autoComplete="on"
                    {...register("email", { required: t('pages.signIn.errorEmailRequired') })}
                />
                {errors.email && <p className="-mt-3 lg:-mt-6 px-1 text-sm lg:text-xl text-rose-600 dark:text-rose-400 transition-[font-size_color_margin-top] duration-350">{errors.email.message}</p>}
                <Input
                    type="password"
                    required
                    placeholder={t('pages.signIn.passwordPlaceholder')}
                    error={errors.password !== undefined}
                    autoComplete="off"
                    {...register("password", { required: t('pages.signIn.errorPasswordRequired'), minLength: { value: 8, message: t('pages.signIn.errorPasswordLength') } })}
                />
                {errors.password && <p className="-mt-3 lg:-mt-6 px-1 text-sm lg:text-xl text-rose-600 dark:text-rose-400 transition-[font-size_color_margin-top] duration-350">{errors.password.message}</p>}
                <div className="flex mt-6 lg:mt-12 [transition:margin-top_350ms]">
                    <Button
                        title={t('pages.signIn.buttonSubmitTitle')}
                        type="submit"
                        loading={loading}
                        disabled={loadingOrError}
                    >
                        <p className={`flex-1 text-center text-base lg:text-xl font-mono uppercase pl-[24px] lg:pl-[36px] ${loadingOrError ? 'text-indigo-100 dark:text-gray-600' : 'text-white'} transition-[font-size_color_padding-left] duration-350`}>{t('pages.signIn.buttonText')}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`size-[24px] lg:size-[32px] ${loadingOrError ? 'fill-indigo-100 dark:fill-gray-600' : 'fill-white'} [transition:fill_350ms,width_350ms,height_350ms]`}
                        >
                            <path d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6l-6 6Z" />
                        </svg>
                    </Button>
                </div>
            </form>
            {modals}
        </div>
    );
}

export default SignIn;