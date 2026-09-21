import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Layers3, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../Hook/useAuth.js'

export default function Register() {
    const navigate = useNavigate()
    const { registerHandler } = useAuth()
    const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'member' })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submit = async (event) => {
        event.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            await registerHandler(form)
            navigate('/', { replace: true })
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'We could not create your workspace account.')
        } finally {
            setSubmitting(false)
        }
    }

    const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

    return (
        <main className="min-h-screen bg-navy px-5 py-6 text-ink md:px-8 md:py-8">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl border border-orange-500/15 bg-surface shadow-2xl shadow-orange-950/20 lg:grid-cols-[0.92fr_1.08fr]">
                <section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between" style={{ background: 'linear-gradient(145deg, #21150f 0%, #120e0b 75%)' }}><div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" /><div className="relative"><div className="mb-8 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accentLight text-white"><Layers3 className="h-5 w-5" /></span><span className="font-display text-xl font-semibold">SyncSpace</span></div><p className="max-w-md font-display text-4xl leading-tight text-ink">Turn scattered work into a shared rhythm.</p><p className="mt-5 max-w-sm text-sm leading-6 text-muted">Start with your own focus system, then bring your team into the same clear workspace.</p></div><div className="relative space-y-3 text-sm text-muted"><p className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-accentLight" /> Plan projects with intention</p><p className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-accentLight" /> Keep tasks close to context</p><p className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-accentLight" /> Move together without the noise</p></div></section>
                <section className="flex items-center px-6 py-10 md:px-12"><div className="mx-auto w-full max-w-md"><div className="mb-9 lg:hidden"><div className="mb-6 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accentLight text-white"><Layers3 className="h-5 w-5" /></span><span className="font-display text-xl font-semibold">SyncSpace</span></div></div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-accentLight">Start clearly</p><h1 className="font-display text-3xl font-bold md:text-4xl">Build your workspace.</h1><p className="mt-3 text-sm leading-6 text-muted">Create an account for focused personal work and organized collaboration.</p>{error && <div className="mt-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</div>}<form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-xs text-muted">Full name<div className="relative mt-2"><UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><input required minLength={3} value={form.fullName} onChange={update('fullName')} placeholder="Alex Morgan" className="w-full rounded-xl border border-orange-500/15 bg-orange-500/[0.04] py-3 pl-10 pr-3 text-sm text-ink outline-none placeholder:text-muted focus:border-orange-400/60" /></div></label><label className="block text-xs text-muted">Work email<div className="relative mt-2"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><input required type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" className="w-full rounded-xl border border-orange-500/15 bg-orange-500/[0.04] py-3 pl-10 pr-3 text-sm text-ink outline-none placeholder:text-muted focus:border-orange-400/60" /></div></label><label className="block text-xs text-muted">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" /><input required minLength={6} type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder="At least 6 characters" className="w-full rounded-xl border border-orange-500/15 bg-orange-500/[0.04] py-3 pl-10 pr-11 text-sm text-ink outline-none placeholder:text-muted focus:border-orange-400/60" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label><label className="block text-xs text-muted">How will you use SyncSpace?<select value={form.role} onChange={update('role')} className="mt-2 w-full rounded-xl border border-orange-500/15 bg-orange-500/[0.04] px-3 py-3 text-sm text-ink outline-none focus:border-orange-400/60"><option value="member" className="bg-[#1a1410]">Personal focus and projects</option><option value="manager" className="bg-[#1a1410]">Lead a team or organization</option></select></label><button disabled={submitting} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #ff6b3d, #ffb347)', boxShadow: '0 8px 22px rgba(255,107,61,0.25)' }}>{submitting ? 'Creating workspace...' : 'Create account'}<ArrowRight className="h-4 w-4" /></button></form><p className="mt-8 text-center text-sm text-muted">Already have an account? <Link to="/login" className="font-medium text-accentLight hover:text-ink">Sign in</Link></p></div></section>
            </div>
        </main>
    )
}
