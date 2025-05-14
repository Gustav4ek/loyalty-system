module.exports = {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "gray-00": "var(--gray-00)",
          "gray-200": "var(--gray-200)",
          "gray-400": "var(--gray-400)",
          "gray-50": "var(--gray-50)",
          "gray-500": "var(--gray-500)",
          "gray-600": "var(--gray-600)",
          "gray-800": "var(--gray-800)",
          "gray-900": "var(--gray-900)",
          voucherifyinfowarningalert: "var(--voucherifyinfowarningalert)",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        fontFamily: {
          "body-body-2": "var(--body-body-2-font-family)",
          "body-body-3": "var(--body-body-3-font-family)",
          "form-input-value": "var(--form-input-value-font-family)",
          "headline-7": "var(--headline-7-font-family)",
          "headline-headline-3": "var(--headline-headline-3-font-family)",
          "headline-headline-4": "var(--headline-headline-4-font-family)",
          "headline-headline-6": "var(--headline-headline-6-font-family)",
          "subhead-subhead-1": "var(--subhead-subhead-1-font-family)",
          "subhead-subhead-2": "var(--subhead-subhead-2-font-family)",
          "subhead-subhead-4": "var(--subhead-subhead-4-font-family)",
          sans: [
            "ui-sans-serif",
            "system-ui",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
          ],
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
      container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    },
    plugins: [],
    darkMode: ["class"],
  };
  