declare module 'react-mobile-datepicker' {
  interface ReactMobileDatepickerSlide extends React.ElementType<HTMLInputElement> {
    value: Date;
    isOpen: boolean;
    isPopup: boolean;
    showHeader: boolean;
    showFooter: boolean;
    onSelect: () => void;
    onCancel: () => void;
    theme: 'default' | 'dark' | 'ios' | 'android' | 'android-dark';
    dateConfig: {};
    max: Date;
    min: Date;
  }
}
