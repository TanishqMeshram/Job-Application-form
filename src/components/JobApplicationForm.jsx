import React, { useState, useEffect } from 'react';

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: [],
        otherSkill: '',
        preferredInterviewTime: ''
    });

    const [errors, setErrors] = useState({});
    const [showInfoBox, setShowInfoBox] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showContainer, setShowContainer] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [showOtherSkillInput, setShowOtherSkillInput] = useState(false);

    const handleCloseContainer = () => {
        setShowContainer(false);
        setSubmittedData(null);
    };

    const handleSkillChange = (skill, isChecked) => {
        if (skill === 'Other') {
            setShowOtherSkillInput(isChecked);
            if (!isChecked) {
                setFormData(prevFormData => ({ ...prevFormData, otherSkill: '' }));
            }
        } else {
            setFormData(prevFormData => {
                if (isChecked) {
                    return { ...prevFormData, additionalSkills: [...prevFormData.additionalSkills, skill] };
                } else {
                    return { ...prevFormData, additionalSkills: prevFormData.additionalSkills.filter(s => s !== skill) };
                }
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || Number(formData.relevantExperience) <= 0 || isNaN(Number(formData.relevantExperience)))) {
            newErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
        }
        if (formData.position === 'Designer' && !formData.portfolioUrl) {
            newErrors.portfolioUrl = 'Portfolio URL is required';
        } else if (formData.portfolioUrl && !/^https?:\/\/.+\..+$/.test(formData.portfolioUrl)) {
            newErrors.portfolioUrl = 'Portfolio URL is invalid';
        }
        if (formData.position === 'Manager' && !formData.managementExperience) {
            newErrors.managementExperience = 'Management Experience is required';
        }
        if (formData.additionalSkills.length === 0 && !formData.otherSkill) {
            newErrors.additionalSkills = 'At least one skill must be selected';
        }
        if (!formData.preferredInterviewTime) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setShowInfoBox(false);
                setShowContainer(true);
                setSubmittedData({ ...formData });
                resetForm();
            }, 500);
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            position: '',
            relevantExperience: '',
            portfolioUrl: '',
            managementExperience: '',
            additionalSkills: [],
            otherSkill: '',
            preferredInterviewTime: ''
        });
        setErrors({});
        setShowInfoBox(false);
        setShowOtherSkillInput(false);
    };

    useEffect(() => {
        if (formData.position === 'Developer' || formData.position === 'Designer' || formData.position === 'Manager') {
            setShowInfoBox(true);
        } else {
            setShowInfoBox(false);
        }
    }, [formData.position]);

    return (
        <>
            <style>{`
                .bg-neutral-light {
                    background-color: #f3f4f6;
                }
                .bg-gradient-to-r {
                    background-image: linear-gradient(to right, #3182ce, #ebf4ff);
                }
                .text-primary {
                    color: #3182ce;
                }
                .text-secondary {
                    color: #4a5568;
                }
                .text-red-500 {
                    color: #f56565;
                }
                .info-block {
                    background-color: white;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 1rem;
                    width: 100%;
                    display: ${showInfoBox ? 'block' : 'none'};
                    border-radius: 2rem;
                    margin-top: 1rem;
                }
                @media (min-width: 1120px) {
                    .info-block {
                        position: absolute;
                        top: 50%;
                        left: 100%;
                        transform: translateY(-50%);
                        width: 300px;
                        z-index: 10;
                        margin-top: 0;
                    }
                }
                .container {
                    position: absolute;
                    top: 30%;
                    left: ${showContainer ? '50%' : '-100%'};
                    transform: translateX(-50%);
                    background-color: white;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 2rem;
                    width: 80%;
                    max-width: 600px;
                    z-index: 20;
                    transition: left 2s ease-in-out;
                    opacity: ${showContainer ? 1 : 0};
                }
            `}</style>
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url('/jobappform.jpg')` }}>
                <div className="max-w-lg w-full p-6 rounded-lg shadow-lg relative bg-[#162e48]">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold mb-6 text-center text-[#68d4e7]">Job Application Form</h1>
                        <div>
                            <label className="mt-2 block text-sm font-medium text-white">Full Name*</label>
                            <input
                                type="text"
                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.fullName ? ' placeholder-red-500' : 'border-gray-300'}`}
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder={errors.fullName ? errors.fullName : 'Full Name'}
                            />
                        </div>
                        <div>
                            <label className="mt-2 block text-sm font-medium text-white">Email*</label>
                            <input
                                type="email"
                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.email ? ' placeholder-red-500' : 'border-gray-300'}`}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={errors.email ? errors.email : 'Email'}
                            />
                        </div>
                        <div>
                            <label className="mt-2 block text-sm font-medium text-white">Phone Number*</label>
                            <input
                                type="tel"
                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.phoneNumber ? ' placeholder-red-500' : 'border-gray-300'}`}
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                placeholder={errors.phoneNumber ? errors.phoneNumber : 'Phone Number'}
                            />
                        </div>
                        <div>
                            <label className="mt-2 block text-sm font-medium text-white">Applying for Position*</label>
                            <select
                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.position ? ' placeholder-red-500' : 'border-gray-300'}`}
                                value={formData.position}
                                onChange={(e) => {
                                    setFormData({ ...formData, position: e.target.value });
                                    setShowInfoBox(['Developer', 'Designer', 'Manager'].includes(e.target.value));
                                }}
                            >
                                <option value="" disabled>-- Select Position --</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                        {showInfoBox && (
                            <div className="info-block">
                                {formData.position === 'Developer' && (
                                    <div>
                                        <label className="mt-2 block text-sm font-medium text-[#162e48]">Relevant Experience* (in years)</label>
                                        <input
                                            type="number"
                                            className={`mt-1 block                                             w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.relevantExperience ? ' placeholder-red-500' : 'border-gray-300'}`}
                                            value={formData.relevantExperience}
                                            onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                                            placeholder={errors.relevantExperience ? errors.relevantExperience : 'Relevant Experience'}
                                        />
                                    </div>
                                )}
                                {formData.position === 'Designer' && (
                                    <>
                                        <div>
                                            <label className="mt-2 block text-sm font-medium text-[#162e48]">Relevant Experience* (in years)</label>
                                            <input
                                                type="number"
                                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.relevantExperience ? ' placeholder-red-500' : 'border-gray-300'}`}
                                                value={formData.relevantExperience}
                                                onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                                                placeholder={errors.relevantExperience ? errors.relevantExperience : 'Relevant Experience'}
                                            />
                                        </div>
                                        <div>
                                            <label className="mt-2 block text-sm font-medium text-[#162e48]">Portfolio URL</label>
                                            <input
                                                type="url"
                                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.portfolioUrl ? ' placeholder-red-500' : 'border-gray-300'}`}
                                                value={formData.portfolioUrl}
                                                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                                                placeholder={errors.portfolioUrl ? errors.portfolioUrl : 'Portfolio URL'}
                                            />
                                        </div>
                                    </>
                                )}
                                {formData.position === 'Manager' && (
                                    <div>
                                        <label className="mt-2 block text-sm font-medium text-[#162e48]">Management Experience*</label>
                                        <input
                                            type="text"
                                            className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.managementExperience ? ' placeholder-red-500' : 'border-gray-300'}`}
                                            value={formData.managementExperience}
                                            onChange={(e) => setFormData({ ...formData, managementExperience: e.target.value })}
                                            placeholder={errors.managementExperience ? errors.managementExperience : 'Management Experience'}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <div>
                            <label className="mt-2 block text-sm font-medium text-white">Additional Skills(atleast 1)</label>
                            <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {['JavaScript', 'CSS', 'Python', 'HTML', 'React', 'Other'].map(skill => (
                                    <div key={skill} className="flex items-center ">
                                        {skill === 'Other' && showOtherSkillInput ? (
                                            <input
                                                type="text"
                                                className="block w-full border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                                value={formData.otherSkill}
                                                onChange={(e) => setFormData({ ...formData, otherSkill: e.target.value })}
                                                placeholder="Other Skill"
                                            />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-primary"
                                                checked={formData.additionalSkills.includes(skill)}
                                                onChange={(e) => handleSkillChange(skill, e.target.checked)}
                                            />
                                        )}
                                        <span className="ml-2 text-sm text-white">{skill}</span>
                                    </div>
                                ))}
                            </div>
                            {errors.additionalSkills && <p className="text-red-500 text-xs mt-1">{errors.additionalSkills}</p>}
                        </div>
                        <div>
                            <label className="mt-2 block text-sm font-medium text-white">Preferred Interview Time*</label>
                            <input
                                type="datetime-local"
                                className={`mt-1 block w-full p-3 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.preferredInterviewTime ? ' placeholder-red-500' : 'border-gray-300'}`}
                                value={formData.preferredInterviewTime}
                                onChange={(e) => setFormData({ ...formData, preferredInterviewTime: e.target.value })}
                                placeholder={errors.preferredInterviewTime ? errors.preferredInterviewTime : 'Preferred Interview Time'}
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showContainer && submittedData && (
                <div className="container">
                    <h2 className="text-xl font-bold mb-4 text-primary">Submitted Data</h2>
                    <div>
                        <p><strong>Full Name:</strong> {submittedData.fullName}</p>
                        <p><strong>Email:</strong> {submittedData.email}</p>
                        <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
                        <p><strong>Position:</strong> {submittedData.position}</p>
                        {submittedData.position === 'Developer' && (
                            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
                        )}
                        {submittedData.position === 'Designer' && (
                            <>
                                <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
                                <p><strong>Portfolio URL:</strong> {submittedData.portfolioUrl}</p>
                            </>
                        )}
                        {submittedData.position === 'Manager' && (
                            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
                        )}
                        <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
                        <p><strong>Other Skills:</strong> {submittedData.otherSkill}</p>
                        <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
                    </div>
                    <button
                className="text-sm font-semibold text-blue-500 hover:text-blue-900 focus:outline-none"
                onClick={handleCloseContainer}
            >
                Close
            </button>
                </div>
            )}
        </>
    );
};

export default JobApplicationForm;