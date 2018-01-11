import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import CheckboxGroup from './CheckboxGroup'

const EXTRAS_INCLUSIONS = [
    { label: 'General Dental', value: 'DENTAL_GENERAL' },
    { label: 'Major Dental', value: 'DENTAL_MAJOR' },
    { label: 'Endodontic', value: 'DENTAL_ENDODONTIC' },
    { label: 'Orthodontic', value: 'DENTAL_ORTHODONTIC' },
    { label: 'Optical', value: 'OPTICAL' },
    { label: 'Non PBS Pharmaceutical', value: 'NON_PBS_PHARMACEUTICALS' },
    { label: 'Physiotherapy', value: 'PHYSIOTHERAPY' },
    { label: 'Chiropractic', value: 'CHIROPRACTIC' },
    { label: 'Podiatry', value: 'PODIATRY' },
    { label: 'Phsychology', value: 'CLINICAL_PSYCHOLOGY' },
    { label: 'Acupuncture', value: 'ACUPUNCTURE' },
    { label: 'Naturopathy', value: 'NATUROPATHY' },
    { label: 'Massge', value: 'MASSAGE' },
    { label: 'Hearing Aids', value: 'HEARING_AIDS' },
    { label: 'Blood Glucose Monitor', value: 'BLOOD_GLUCOSE_MONITOR' }
]

const HOSPITAL_INCLUSIONS = [
    { label: 'Heart Surgery', value: 'HEART_SUGERY' },
    { label: 'Eye Surgery', value: 'EYE_SURGERY' },
    { label: 'Pregnancy', value: 'PREGNANCY' },
    { label: 'IVF', value: 'IVF' },
    { label: 'Joint Replacements', value: 'JOINT_REPLACEMENTS' },
    { label: 'Dialysis', value: 'DIALYSIS' },
    { label: 'Surgical Weight Loss Procedures', value: 'SURGICAL_WEIGHT_LOSS_PROCEDURES' },
    { label: 'Sterilisation', value: 'STERILISATION' },
    { label: 'Non Cosmetic Plastic Surgery', value: 'NON_COSMETIC_PLASTIC_SURGERY' },
    { label: 'In Hospital Rehabilitation', value: 'IN_HOSPITAL_REHABILITATION' },
    { label: 'In Hospital Psychiatry', value: 'IN_HOSPITAL_PSYCHIATRY' },
    { label: 'Palliative Care', value: 'PALLIATIVE_CARE' },
    { label: 'Other Non Medicare', value: 'OTHER_NON_MEDICARE' }
]

let PolicySearchForm = props => {
    
    // console.log(props)
    const { handleSubmit, policyType } = props

    return (
        <div>
            <h3 className="f3 lh-copy">Search for Policies</h3>
            <form onSubmit={handleSubmit} className="pa4 black-80">
                <div className="measure">
                    <label htmlFor="policyType" className="f6 b db mb2">Type of policy <span className="normal black-60">(*)</span></label>
                    <Field name="policyType" component="select" className="input-reset ba b--black-20 pa2 mb2 db w-100">
                        <option />
                        <option value="HOSPITAL">Hospital</option>
                        <option value="EXTRAS">Extras</option>
                        <option value="COMBINED">Combined</option>
                    </Field>
                </div>
                <div className="measure">
                    <label htmlFor="whoIsCovered" className="f6 b db mb2">Who is covered <span className="normal black-60">(*)</span></label>
                    <Field name="whoIsCovered" component="select" className="input-reset ba b--black-20 pa2 mb2 db w-100">
                        <option />
                        <option value="SINGLES">Singles</option>
                        <option value="COUPLES">Couples</option>
                        <option value="FAMILIES">Families</option>
                        <option value="SINGLE_PARENTS">Single Parents</option>
                    </Field>
                </div>
                <div className="measure">
                    <label htmlFor="stateOfResidence" className="f6 b db mb2">State you live in <span className="normal black-60">(*)</span></label>
                    <Field name="stateOfResidence" component="select" className="input-reset ba b--black-20 pa2 mb2 db w-100">
                        <option />
                        <option>ACT</option>
                        <option>NSW</option>
                        <option>NT</option>
                        <option>QLD</option>
                        <option>SA</option>
                        <option>TAS</option>
                        <option>VIC</option>
                        <option>WA</option>
                    </Field>
                </div>
                <div className="measure">
                    <label htmlFor="maxMonthlyPremium" className="f6 b db mb2">Monhtly Premium (Max) <span className="normal black-60">(optional)</span></label>
                    <Field name="maxMonthlyPremium" component="input" type="number" className="input-reset ba b--black-20 pa2 mb2 db w-100" />
                </div>
                <div className="mw9 center ph3-ns">
                    <div className="cf ph2-ns">
                        {
                            policyType && (policyType === 'HOSPITAL' || policyType === 'COMBINED')
                                ? (
                                    <div className="fl w-100 w-50-ns pa2">
                                        <h4>Select Required Hospital Inclusions</h4>
                                        <Field
                                            name="hospitalInclusions"
                                            component={CheckboxGroup}
                                            groupId="hospitalInclusions"
                                            groupOptions={HOSPITAL_INCLUSIONS}
                                        />
                                    </div>
                                ) : (<span />)
                        }

                        {
                            policyType && (policyType === 'EXTRAS' || policyType === 'COMBINED')
                                ? (
                                    <div className="fl w-100 w-50-ns pa2">
                                        <h4>Select Required Extras Inclusions</h4>
                                        <Field
                                            name="extrasInclusions"
                                            component={CheckboxGroup}
                                            groupId="extrasInclusions"
                                            groupOptions={EXTRAS_INCLUSIONS}
                                        />
                                    </div>
                                ) : (<span />)
                        }
                    </div>
                </div>
                <div className="mt3">
                    <button type="submit" className="f6 link dim br1 ba bw2 ph3 pv2 mb2 dib mid-gray">Submit</button>
                </div>
            </form>
        </div>
    )
}

PolicySearchForm = reduxForm({
    form: 'search'
})(PolicySearchForm)

const selector = formValueSelector('search')
PolicySearchForm = connect(state => {
    const policyType = selector(state, 'policyType')
    return {
        policyType
    }
  })(PolicySearchForm)
  
export default PolicySearchForm