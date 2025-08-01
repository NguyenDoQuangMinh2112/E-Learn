import classNames from 'classnames/bind'
import styles from './Contact.module.scss'

import img1 from '~/assets/images/value-prop-get-rewarded-v3.webp'
import img2 from '~/assets/images/value-prop-inspire-v3.webp'
import img3 from '~/assets/images/value-prop-teach-v3.webp'
import { useState } from 'react'

const cx = classNames.bind(styles)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    experience: '',
    message: ''
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  const reasons = [
    {
      img: img2,
      title: 'Teach your way',
      description: 'Publish the course you want, in the way you want, and always have control of your own content.',
      icon: '🎓'
    },
    {
      img: img3,
      title: 'Inspire learners',
      description: 'Share your knowledge and expertise with students around the world and make a real impact.',
      icon: '💡'
    },
    {
      img: img1,
      title: 'Get rewarded',
      description: 'Earn money doing what you love and build a sustainable income from your teaching skills.',
      icon: '💰'
    }
  ]

  return (
    <div className={cx('wrapper')}>
      {/* Hero Section */}
      <section className={cx('hero')}>
        <div className={cx('hero__content')}>
          <h1 className={cx('hero__title')}>Teach - On - Elearn</h1>
          <p className={cx('hero__subtitle')}>
            Join thousands of instructors sharing their knowledge and building successful careers
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className={cx('reasons')}>
        <div className={cx('container')}>
          <h2 className={cx('reasons__title')}>So many reasons to start</h2>
          <div className={cx('reasons__grid')}>
            {reasons.map((reason, index) => (
              <div key={index} className={cx('reason-card')}>
                <div className={cx('reason-card__icon')}>
                  <span className={cx('reason-card__emoji')}>{reason.icon}</span>
                  <div className={cx('reason-card__img')}>
                    <img src={reason.img || '/placeholder.svg'} alt={reason.title} />
                  </div>
                </div>
                <h3 className={cx('reason-card__title')}>{reason.title}</h3>
                <p className={cx('reason-card__description')}>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={cx('contact')}>
        <div className={cx('container')}>
          <div className={cx('contact__grid')}>
            {/* Left Column - Information */}
            <div className={cx('contact__info')}>
              <h2 className={cx('contact__title')}>Become an instructor today</h2>
              <p className={cx('contact__description')}>
                Would you like to become an instructor on our website? It's easy! Simply fill out the form or send us an
                email with information about your teaching experience.
              </p>

              <div className={cx('contact__steps')}>
                <h3 className={cx('contact__steps-title')}>Steps to become an instructor:</h3>
                <div className={cx('steps-list')}>
                  <div className={cx('step-item')}>
                    <div className={cx('step-number')}>1</div>
                    <div className={cx('step-content')}>
                      <h4>Submit Application</h4>
                      <p>Fill out our instructor application form with your details and teaching experience.</p>
                    </div>
                  </div>
                  <div className={cx('step-item')}>
                    <div className={cx('step-number')}>2</div>
                    <div className={cx('step-content')}>
                      <h4>Provide Information</h4>
                      <p>Share details about your expertise and the subjects you'd like to teach.</p>
                    </div>
                  </div>
                  <div className={cx('step-item')}>
                    <div className={cx('step-number')}>3</div>
                    <div className={cx('step-content')}>
                      <h4>Review Process</h4>
                      <p>We'll review your application and contact you within 2-3 business days.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx('contact__email')}>
                <h4>Or email us directly:</h4>
                <a href="mailto:nguyendoquangminh2112@gmail.com" className={cx('email-link')}>
                  nguyendoquangminh2112@gmail.com
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={cx('contact__form-wrapper')}>
              <form className={cx('contact__form')} onSubmit={handleSubmit}>
                <h3 className={cx('form__title')}>Instructor Application</h3>

                <div className={cx('form__group')}>
                  <label htmlFor="name" className={cx('form__label')}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cx('form__input')}
                    required
                  />
                </div>

                <div className={cx('form__group')}>
                  <label htmlFor="email" className={cx('form__label')}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cx('form__input')}
                    required
                  />
                </div>

                <div className={cx('form__group')}>
                  <label htmlFor="subject" className={cx('form__label')}>
                    Teaching Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={cx('form__input')}
                    placeholder="e.g., Web Development, Mathematics, Design"
                    required
                  />
                </div>

                <div className={cx('form__group')}>
                  <label htmlFor="experience" className={cx('form__label')}>
                    Teaching Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={cx('form__textarea')}
                    rows={3}
                    placeholder="Briefly describe your teaching background and qualifications"
                  />
                </div>

                <div className={cx('form__group')}>
                  <label htmlFor="message" className={cx('form__label')}>
                    Why do you want to teach on Elearn? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={cx('form__textarea')}
                    rows={4}
                    placeholder="Tell us about your motivation and what you hope to achieve"
                    required
                  />
                </div>

                <button type="submit" className={cx('form__submit')}>
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={cx('faq')}>
        <div className={cx('container')}>
          <h2 className={cx('faq__title')}>Frequently Asked Questions</h2>
          <div className={cx('faq__grid')}>
            <div className={cx('faq__item')}>
              <h4>How long does the review process take?</h4>
              <p>We typically review applications within 2-3 business days and will contact you via email.</p>
            </div>
            <div className={cx('faq__item')}>
              <h4>What qualifications do I need?</h4>
              <p>
                We welcome instructors with various backgrounds. Expertise in your subject area and passion for teaching
                are most important.
              </p>
            </div>
            <div className={cx('faq__item')}>
              <h4>How much can I earn?</h4>
              <p>
                Instructor earnings vary based on course popularity, pricing, and student enrollment. Top instructors
                earn substantial income.
              </p>
            </div>
            <div className={cx('faq__item')}>
              <h4>Do I need teaching experience?</h4>
              <p>
                While teaching experience is valuable, it's not required. We provide resources to help you create
                engaging courses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
