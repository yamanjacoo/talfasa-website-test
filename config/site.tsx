const config = {
  storeName: "Stanley Store",
  newsletter: {
    heading: {
      title: "Stay in the Loop",
      subtitle: "Subscribe to get exclusive offers, early access to new products, and stay updated with Stanley.",
    },
    form: {
      input: {
        placeholder: "Enter your email",
        ariaLabel: "Email address",
      },
      button: {
        text: "Subscribe",
        ariaLabel: "Subscribe to newsletter",
      },
    },
    legal: {
      text: "By subscribing, you agree to our Privacy Policy and consent to receive updates from Stanley.",
      showPrivacyLink: true,
    },
    animation: {
      duration: 0.6,
      staggerDelay: 0.1,
    },
    style: {
      background: {
        color: "#FFFFFF",
        pattern: true,
      },
      spacing: {
        sectionPadding: "py-24",
        contentMaxWidth: "max-w-2xl",
      },
    },
  },
}

export default config

