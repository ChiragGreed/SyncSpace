import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Layers3, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../Hook/useAuth.js'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submit = async (event) => {
        event.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            await login(form)
            navigate('/', { replace: true })
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'We could not sign you in. Check your details and try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-navy px-5 py-6 text-ink md:px-8 md:py-8">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl border border-orange-500/15 bg-surface shadow-2xl shadow-orange-950/20 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between" style={{ background: 'linear-gradient(145deg, #21150f 0%, #120e0b 75%)' }}>
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
                    <div className="relative"><div className="mb-8 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accentLight text-white"><Layers3 className="h-5 w-5" /></span><span className="font-display text-xl font-semibold">SyncSpace</span></div><p className="max-w-md font-display text-4xl leading-tight text-ink">Make progress visible. Keep every moving part in sync.</p><p className="mt-5 max-w-sm text-sm leading-6 text-muted">A calm command center for personal focus and teams that ship together.</p></div>
                    <div className="relative grid grid-cols-2 gap-3"><div className="rounded-2xl border border-orange-500/15 bg-orange-500/6 p-4"><p className="font-display text-2xl text-ink">1 view</p><p className="mt-1 text-xs text-muted">for projects and tasks</p></div><div className="rounded-2xl border border-orange-500/15 bg-orange-500/6 p-4"><p className="font-display text-2xl text-ink">Real-time</p><p className="mt-1 text-xs text-muted">team momentum</p></div></div>
                </section>
                <section className="flex items-center px-6 py-10 md:px-12"><div className="mx-auto w-full max-w-md"><div className="mb-9 lg:hidden"><div className="mb-6 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accentLight text-white"><Layers3 className="h-5 w-5" /></span><span className="font-display text-xl font-semibold">SyncSpace</span></div></div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-accentLight">Welcome back</p><h1 className="font-display text-3xl font-bold md:text-4xl">Pick up where you left off.</h1><p className="mt-3 text-sm leading-6 text-muted">Sign in to see what needs your attention today.</p>{error && <div className="mt-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}<form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-xs text-muted">Email<div className="relative mt-2"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" className="w-full rounded-xl border border-orange-500/15 bg-orange-500/4 py-3 pl-10 pr-3 text-sm text-ink outline-none placeholder:text-muted focus:border-orange-400/60" /></div></label><label className="block text-xs text-muted">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><input required type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Your password" className="w-full rounded-xl border border-orange-500/15 bg-orange-500/4 py-3 pl-10 pr-11 text-sm text-ink outline-none placeholder:text-muted focus:border-orange-400/60" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label><button disabled={submitting} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #ff6b3d, #ffb347)', boxShadow: '0 8px 22px rgba(255,107,61,0.25)' }}>{submitting ? 'Signing in...' : 'Sign in'}<ArrowRight className="h-4 w-4" /></button></form><div className="mt-6 flex items-center gap-2 text-xs text-muted"><ShieldCheck className="h-4 w-4 text-accentLight" /> Your workspace is protected by secure sessions.</div><p className="mt-8 text-center text-sm text-muted">New to SyncSpace? <Link to="/register" className="font-medium text-accentLight hover:text-ink">Create an account</Link></p></div></section>
            </div>
        </main>
    )
}
