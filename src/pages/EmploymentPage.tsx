import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function EmploymentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Centralized State
  const [formData, setFormData] = useState({
    position: '', location: '', firstName: '', lastName: '', email: '', confirmEmail: '',
    street: '', address2: '', city: '', state: '', zip: '',
    homePhone: '', cellPhone: '', dob: '', salary: '', hs: '',
    
    availability: [] as string[], auth: '', felony: '', functions: '', perform: '', specialSkills: '',
    
    contactEmp: '', about: '', terms: false, signature: '', date: ''
  });

  // Dynamic Lists State
  const [qualifications, setQualifications] = useState([{ school: '', degree: '', location: '' }]);
  const [references, setReferences] = useState([{ name: '', location: '', phone: '', relationship: '' }]);
  const [workHistory, setWorkHistory] = useState([{ 
    title: '', start: '', end: '', company: '', supervisor: '', phone: '', reason: '', startSalary: '', endSalary: '' 
  }]);

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.includes(field)) {
      setErrors(errors.filter(e => e !== field));
    }
  };

  const handleCheckbox = (shift: string) => {
    setFormData(prev => {
      const isSelected = prev.availability.includes(shift);
      const newAvailability = isSelected 
        ? prev.availability.filter(s => s !== shift)
        : [...prev.availability, shift];
      return { ...prev, availability: newAvailability };
    });
  };

  const handleNext = () => {
    setShowErrorAlert(false);
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    setShowErrorAlert(false);
    if (step > 1) setStep(step - 1);
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    let errorStep = 0;

    const step1Required = ['position', 'location', 'firstName', 'lastName', 'email', 'confirmEmail', 'street', 'city', 'state', 'zip', 'cellPhone', 'dob', 'salary', 'hs'];
    for (const field of step1Required) {
      if (!formData[field as keyof typeof formData]) {
        newErrors.push(field);
        if (errorStep === 0) errorStep = 1;
      }
    }

    const step2Required = ['auth', 'felony', 'functions', 'perform'];
    for (const field of step2Required) {
      if (!formData[field as keyof typeof formData]) {
        newErrors.push(field);
        if (errorStep === 0) errorStep = 2;
      }
    }

    const step3Required = ['contactEmp', 'signature', 'date'];
    for (const field of step3Required) {
      if (!formData[field as keyof typeof formData]) {
        newErrors.push(field);
        if (errorStep === 0) errorStep = 3;
      }
    }
    if (!formData.terms) {
      newErrors.push('terms');
      if (errorStep === 0) errorStep = 3;
    }

    // Reference validation (ensure at least first reference has a name)
    if (!references[0].name) {
      newErrors.push('ref1_name');
      if (errorStep === 0) errorStep = 3;
    }

    setErrors(newErrors);
    
    if (newErrors.length > 0) {
      setStep(errorStep);
      setShowErrorAlert(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const progressPercentage = step === 1 ? 33 : step === 2 ? 66 : 100;

  // Helper function to get class for an input
  const getInputClass = (field: string, baseClass = "") => {
    const isError = errors.includes(field);
    return `w-full bg-white dark:bg-[#111] border ${isError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-white/20 focus:ring-brand-sky'} rounded-none py-3 px-4 text-sm font-sans outline-none focus:ring-2 focus:border-transparent transition-all shadow-none text-black dark:text-white ${baseClass}`;
  };

  const labelClass = "block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2";
  const errorLabelClass = "block text-xs font-bold uppercase tracking-widest text-red-500 mb-2";

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#111] py-24 px-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-black p-12 max-w-xl w-full border border-gray-200 dark:border-white/10 text-center shadow-2xl"
        >
          <CheckCircle className="w-20 h-20 text-brand-sky mx-auto mb-6" />
          <h2 className="font-display text-4xl uppercase italic font-black tracking-tighter mb-4 text-black dark:text-white">Application Received</h2>
          <p className="text-gray-600 dark:text-gray-400 font-sans mb-8">
            Thank you for applying to Planet Nutrition! Your application has been successfully submitted. Our hiring team will review your qualifications and reach out if you are a good fit for the position.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-brand-deep text-white font-sans text-xs uppercase font-bold tracking-[0.2em] py-4 px-8 hover:bg-brand-sky transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] pb-24">
      
      {/* Header */}
      <div className="bg-gray-200 dark:bg-zinc-900 text-black dark:text-white py-16 px-6 relative overflow-hidden mb-12 border-b border-gray-300 dark:border-white/10">
        <div className="max-w-4xl mx-auto relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl uppercase italic font-black tracking-tighter mb-4"
          >
            Standard Application <span className="text-brand-sky">For Employment</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            It is our policy to comply with all applicable state and federal laws prohibiting discrimination in employment. Please carefully read and answer all questions on this application. All questions must be answered.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Step {step} of 3</span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">{progressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
            <motion.div 
              className="h-full bg-brand-sky"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Global Error Alert */}
        <AnimatePresence>
          {showErrorAlert && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-500/50 p-4 mb-8 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-1 uppercase tracking-wider">Required Information Missing</h4>
                <p className="text-red-600 dark:text-red-300 text-xs">Please fill out all the highlighted fields marked in red before submitting your application.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <div className="bg-white dark:bg-black p-6 md:p-10 border border-gray-200 dark:border-white/10 shadow-xl relative overflow-hidden min-h-[600px]">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">Position Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={errors.includes('position') ? errorLabelClass : labelClass}>Position applying for:</label>
                      <input type="text" value={formData.position} onChange={e => updateForm('position', e.target.value)} className={getInputClass('position')} />
                    </div>
                    <div>
                      <label className={errors.includes('location') ? errorLabelClass : labelClass}>Location applying for:</label>
                      <select value={formData.location} onChange={e => updateForm('location', e.target.value)} className={getInputClass('location')}>
                        <option value="">Select a location...</option>
                        <option value="WIGGINS, MS">WIGGINS, MS</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">Your Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={errors.includes('firstName') ? errorLabelClass : labelClass}>First Name</label>
                      <input type="text" value={formData.firstName} onChange={e => updateForm('firstName', e.target.value)} className={getInputClass('firstName')} />
                    </div>
                    <div>
                      <label className={errors.includes('lastName') ? errorLabelClass : labelClass}>Last Name</label>
                      <input type="text" value={formData.lastName} onChange={e => updateForm('lastName', e.target.value)} className={getInputClass('lastName')} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={errors.includes('email') ? errorLabelClass : labelClass}>Email Address</label>
                      <input type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} className={getInputClass('email')} />
                    </div>
                    <div>
                      <label className={errors.includes('confirmEmail') ? errorLabelClass : labelClass}>Confirm Email</label>
                      <input type="email" value={formData.confirmEmail} onChange={e => updateForm('confirmEmail', e.target.value)} className={getInputClass('confirmEmail')} />
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className={errors.includes('street') ? errorLabelClass : labelClass}>Street Address</label>
                      <input type="text" value={formData.street} onChange={e => updateForm('street', e.target.value)} className={getInputClass('street')} />
                    </div>
                    <div>
                      <label className={labelClass}>Address Line 2</label>
                      <input type="text" value={formData.address2} onChange={e => updateForm('address2', e.target.value)} className={getInputClass('address2')} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className={errors.includes('city') ? errorLabelClass : labelClass}>City</label>
                        <input type="text" value={formData.city} onChange={e => updateForm('city', e.target.value)} className={getInputClass('city')} />
                      </div>
                      <div>
                        <label className={errors.includes('state') || errors.includes('zip') ? errorLabelClass : labelClass}>State / Zip</label>
                        <div className="flex gap-2">
                          <input type="text" placeholder="ST" value={formData.state} onChange={e => updateForm('state', e.target.value)} className={`${getInputClass('state')} w-1/3`} maxLength={2} />
                          <input type="text" placeholder="Zip" value={formData.zip} onChange={e => updateForm('zip', e.target.value)} className={`${getInputClass('zip')} w-2/3`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className={labelClass}>Home Phone</label>
                      <input type="tel" value={formData.homePhone} onChange={e => updateForm('homePhone', e.target.value)} className={getInputClass('homePhone')} />
                    </div>
                    <div>
                      <label className={errors.includes('cellPhone') ? errorLabelClass : labelClass}>Cellular Phone</label>
                      <input type="tel" value={formData.cellPhone} onChange={e => updateForm('cellPhone', e.target.value)} className={getInputClass('cellPhone')} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={errors.includes('dob') ? errorLabelClass : labelClass}>Date of Birth</label>
                      <input type="date" value={formData.dob} onChange={e => updateForm('dob', e.target.value)} className={getInputClass('dob')} />
                    </div>
                    <div>
                      <label className={errors.includes('salary') ? errorLabelClass : labelClass}>Salary Desired</label>
                      <input type="text" value={formData.salary} onChange={e => updateForm('salary', e.target.value)} className={getInputClass('salary')} />
                    </div>
                    <div>
                      <label className={errors.includes('hs') ? errorLabelClass : labelClass}>High School Diploma / GED?</label>
                      <div className={`flex gap-6 mt-3 p-2 border ${errors.includes('hs') ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent'}`}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                          <input type="radio" name="hs" value="yes" checked={formData.hs === 'yes'} onChange={e => updateForm('hs', e.target.value)} className="accent-brand-sky" /> Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                          <input type="radio" name="hs" value="no" checked={formData.hs === 'no'} onChange={e => updateForm('hs', e.target.value)} className="accent-brand-sky" /> No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* STEP 2: QUALIFICATIONS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">Availability & Status</h2>
                  
                  <label className={labelClass}>Check all that you are willing to work:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['Full Time', 'Part Time', 'Days', 'Evenings', 'Swing', 'Graveyard', 'Weekends', 'Regular', 'Temporary'].map(shift => (
                      <label key={shift} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                        <input type="checkbox" checked={formData.availability.includes(shift)} onChange={() => handleCheckbox(shift)} className="accent-brand-sky w-4 h-4" /> {shift}
                      </label>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={errors.includes('auth') ? errorLabelClass : labelClass}>Are you authorized to work in the U.S. on an unrestricted basis?</label>
                      <div className={`flex gap-6 p-2 border ${errors.includes('auth') ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent'}`}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="auth" value="yes" checked={formData.auth === 'yes'} onChange={e => updateForm('auth', e.target.value)} className="accent-brand-sky" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="auth" value="no" checked={formData.auth === 'no'} onChange={e => updateForm('auth', e.target.value)} className="accent-brand-sky" /> No</label>
                      </div>
                    </div>
                    <div>
                      <label className={errors.includes('felony') ? errorLabelClass : labelClass}>Have you ever been convicted of a felony?</label>
                      <p className="text-[10px] text-gray-500 mb-2 italic">(Convictions will not necessarily disqualify an applicant for employment)</p>
                      <div className={`flex gap-6 p-2 border ${errors.includes('felony') ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent'}`}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="felony" value="yes" checked={formData.felony === 'yes'} onChange={e => updateForm('felony', e.target.value)} className="accent-brand-sky" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="felony" value="no" checked={formData.felony === 'no'} onChange={e => updateForm('felony', e.target.value)} className="accent-brand-sky" /> No</label>
                      </div>
                    </div>
                    <div>
                      <label className={errors.includes('functions') ? errorLabelClass : labelClass}>Have you been told the essential functions of the job or viewed a copy of the description?</label>
                      <div className={`flex gap-6 p-2 border ${errors.includes('functions') ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent'}`}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="functions" value="yes" checked={formData.functions === 'yes'} onChange={e => updateForm('functions', e.target.value)} className="accent-brand-sky" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="functions" value="no" checked={formData.functions === 'no'} onChange={e => updateForm('functions', e.target.value)} className="accent-brand-sky" /> No</label>
                      </div>
                    </div>
                    <div>
                      <label className={errors.includes('perform') ? errorLabelClass : labelClass}>Can you perform these essential functions with or without reasonable accommodation?</label>
                      <div className={`flex gap-6 p-2 border ${errors.includes('perform') ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent'}`}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="perform" value="yes" checked={formData.perform === 'yes'} onChange={e => updateForm('perform', e.target.value)} className="accent-brand-sky" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="perform" value="no" checked={formData.perform === 'no'} onChange={e => updateForm('perform', e.target.value)} className="accent-brand-sky" /> No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">Qualifications</h2>
                  <p className="text-sm text-gray-500 mb-6">Please list any education or training you feel relates to the position applied for that would help you perform the work, such as schools, colleges, degrees, vocational or technical programs, and military training.</p>
                  
                  {qualifications.map((q, i) => (
                    <div key={i} className="flex gap-4 items-end mb-4 bg-gray-50 dark:bg-white/5 p-4 relative group border border-gray-200 dark:border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div>
                          <label className={labelClass}>School Name</label>
                          <input type="text" value={q.school} onChange={e => { const n = [...qualifications]; n[i].school = e.target.value; setQualifications(n); }} className={getInputClass('')} />
                        </div>
                        <div>
                          <label className={labelClass}>Degree</label>
                          <input type="text" value={q.degree} onChange={e => { const n = [...qualifications]; n[i].degree = e.target.value; setQualifications(n); }} className={getInputClass('')} />
                        </div>
                        <div>
                          <label className={labelClass}>Address/City/State</label>
                          <input type="text" value={q.location} onChange={e => { const n = [...qualifications]; n[i].location = e.target.value; setQualifications(n); }} className={getInputClass('')} />
                        </div>
                      </div>
                      {qualifications.length > 1 && (
                        <button type="button" onClick={() => setQualifications(qualifications.filter((_, idx) => idx !== i))} className="h-[46px] w-[46px] flex items-center justify-center border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => setQualifications([...qualifications, { school: '', degree: '', location: '' }])} className="text-brand-sky text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-brand-deep transition-colors mt-2">
                    <Plus className="w-4 h-4" /> Add Another School
                  </button>
                </div>

                <div>
                  <label className={labelClass}>Special Skills</label>
                  <p className="text-sm text-gray-500 mb-2">List any special skills or experience that you feel would help you in the position that you are applying for (leadership, organizations/teams, etc.)</p>
                  <textarea rows={4} value={formData.specialSkills} onChange={e => updateForm('specialSkills', e.target.value)} className={getInputClass('specialSkills')}></textarea>
                </div>

              </motion.div>
            )}

            {/* STEP 3: REFERENCES & WORK HISTORY */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">References</h2>
                  <p className="text-sm text-gray-500 mb-6">Please list three professional references not related to you. If you don't have three professional references, then list personal, unrelated references.</p>
                  
                  {references.map((r, i) => (
                    <div key={i} className={`flex gap-4 items-end mb-4 bg-gray-50 dark:bg-white/5 p-4 relative group border ${errors.includes('ref1_name') && i === 0 ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                        <div>
                          <label className={errors.includes('ref1_name') && i === 0 ? errorLabelClass : labelClass}>Name {i === 0 && <span className="text-red-500 normal-case">*</span>}</label>
                          <input type="text" value={r.name} onChange={e => { 
                            const n = [...references]; n[i].name = e.target.value; setReferences(n); 
                            if(i === 0 && errors.includes('ref1_name')) setErrors(errors.filter(err => err !== 'ref1_name'));
                          }} className={getInputClass(i === 0 ? 'ref1_name' : '')} />
                        </div>
                        <div>
                          <label className={labelClass}>Address/City/State</label>
                          <input type="text" value={r.location} onChange={e => { const n = [...references]; n[i].location = e.target.value; setReferences(n); }} className={getInputClass('')} />
                        </div>
                        <div>
                          <label className={labelClass}>Phone</label>
                          <input type="tel" value={r.phone} onChange={e => { const n = [...references]; n[i].phone = e.target.value; setReferences(n); }} className={getInputClass('')} />
                        </div>
                        <div>
                          <label className={labelClass}>Relationship</label>
                          <input type="text" value={r.relationship} onChange={e => { const n = [...references]; n[i].relationship = e.target.value; setReferences(n); }} className={getInputClass('')} />
                        </div>
                      </div>
                      {references.length > 1 && (
                        <button type="button" onClick={() => setReferences(references.filter((_, idx) => idx !== i))} className="h-[46px] w-[46px] flex items-center justify-center border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => setReferences([...references, { name: '', location: '', phone: '', relationship: '' }])} className="text-brand-sky text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-brand-deep transition-colors mt-2">
                    <Plus className="w-4 h-4" /> Add Another Reference
                  </button>
                </div>

                <div>
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">Work History</h2>
                  <p className="text-sm text-gray-500 mb-6">Start with your present or most recent employment and work back. INCLUDE PAID AND UNPAID POSITIONS.</p>
                  
                  {workHistory.map((w, i) => (
                    <div key={i} className="mb-6 bg-gray-50 dark:bg-white/5 p-4 border border-gray-200 dark:border-white/10 relative">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className={labelClass}>Job Title</label><input type="text" value={w.title} onChange={e => { const n = [...workHistory]; n[i].title = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                        <div><label className={labelClass}>Start Date</label><input type="month" value={w.start} onChange={e => { const n = [...workHistory]; n[i].start = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                        <div><label className={labelClass}>End Date</label><input type="month" value={w.end} onChange={e => { const n = [...workHistory]; n[i].end = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className={labelClass}>Company Name</label><input type="text" value={w.company} onChange={e => { const n = [...workHistory]; n[i].company = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                        <div><label className={labelClass}>Supervisor's Name</label><input type="text" value={w.supervisor} onChange={e => { const n = [...workHistory]; n[i].supervisor = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                        <div><label className={labelClass}>Phone Number</label><input type="tel" value={w.phone} onChange={e => { const n = [...workHistory]; n[i].phone = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className={labelClass}>Reason for Leaving</label><input type="text" value={w.reason} onChange={e => { const n = [...workHistory]; n[i].reason = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                        <div><label className={labelClass}>Starting Salary</label><input type="text" value={w.startSalary} onChange={e => { const n = [...workHistory]; n[i].startSalary = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                        <div><label className={labelClass}>Ending Salary</label><input type="text" value={w.endSalary} onChange={e => { const n = [...workHistory]; n[i].endSalary = e.target.value; setWorkHistory(n); }} className={getInputClass('')} /></div>
                      </div>
                      
                      {workHistory.length > 1 && (
                        <button type="button" onClick={() => setWorkHistory(workHistory.filter((_, idx) => idx !== i))} className="absolute -top-3 -right-3 h-8 w-8 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-600 transition-colors shadow-lg z-10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => setWorkHistory([...workHistory, { title: '', start: '', end: '', company: '', supervisor: '', phone: '', reason: '', startSalary: '', endSalary: '' }])} className="text-brand-sky text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-brand-deep transition-colors">
                    <Plus className="w-4 h-4" /> Add Another Employer
                  </button>
                </div>

                <div>
                  <label className={errors.includes('contactEmp') ? errorLabelClass : labelClass}>May we contact your present employer?</label>
                  <div className={`flex gap-6 mt-2 p-2 border ${errors.includes('contactEmp') ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent'}`}>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="contactEmp" value="yes" checked={formData.contactEmp === 'yes'} onChange={e => updateForm('contactEmp', e.target.value)} className="accent-brand-sky" /> Yes</label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="contactEmp" value="no" checked={formData.contactEmp === 'no'} onChange={e => updateForm('contactEmp', e.target.value)} className="accent-brand-sky" /> No</label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"><input type="radio" name="contactEmp" value="na" checked={formData.contactEmp === 'na'} onChange={e => updateForm('contactEmp', e.target.value)} className="accent-brand-sky" /> N/A</label>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-100 dark:border-white/5">
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white pb-2">More About You</h2>
                  <label className={labelClass}>Tell Us About Yourself</label>
                  <textarea rows={6} value={formData.about} onChange={e => updateForm('about', e.target.value)} className={getInputClass('about')}></textarea>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-100 dark:border-white/5">
                  <h2 className="text-xl font-display uppercase italic font-black mb-6 text-black dark:text-white pb-2">Terms and Conditions <span className="text-red-500 font-sans text-sm italic normal-case font-normal">(Required)</span></h2>
                  
                  <div className={`bg-gray-50 dark:bg-white/5 p-4 border text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 ${errors.includes('terms') ? 'border-red-500' : 'border-gray-200 dark:border-white/10'}`}>
                    I certify that the facts set forth in this Application for Employment are true and complete to the best of my knowledge. I understand that if I am employed, false statements, omissions or misrepresentations may result in my dismissal. I authorize the Employer to make an investigation of any of the facts set forth in this application and release the Employer from any liability. The employer may contact any listed references on this application. I acknowledge and understand that the company is an "at will" employer. Therefore, any employee (regular, temporary, or other type of category employee) may resign at any time, just as the employer may terminate the employment relationship with any employee at any time, with or without cause, with or without notice to the other party.
                  </div>
                  
                  <label className={`flex items-center gap-3 cursor-pointer text-sm font-bold mb-8 p-2 border ${errors.includes('terms') ? 'text-red-500 border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'text-black dark:text-white border-transparent'}`}>
                    <input type="checkbox" checked={formData.terms} onChange={e => updateForm('terms', e.target.checked)} className="accent-brand-sky w-5 h-5" /> 
                    I agree to the terms and conditions.
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={errors.includes('signature') ? errorLabelClass : labelClass}>Signature <span className="text-gray-400 text-[10px] normal-case">(Type Full Name)</span></label>
                      <input type="text" value={formData.signature} onChange={e => updateForm('signature', e.target.value)} placeholder="Digital Signature" className={`${getInputClass('signature')} font-display italic tracking-wide text-lg border-dashed`} />
                    </div>
                    <div>
                      <label className={errors.includes('date') ? errorLabelClass : labelClass}>Date</label>
                      <input type="date" value={formData.date} onChange={e => updateForm('date', e.target.value)} className={getInputClass('date')} />
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Controls */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handlePrev}
                className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white font-bold uppercase tracking-widest text-xs transition-colors py-3"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div></div> // Empty div for flex alignment
            )}

            {step < 3 ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="flex items-center gap-2 bg-brand-deep hover:bg-brand-sky text-white font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 transition-colors shadow-lg"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-brand-sky hover:bg-brand-deep text-white font-bold uppercase tracking-[0.2em] text-xs py-4 px-10 transition-all shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'} <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
