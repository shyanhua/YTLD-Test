import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

export const authenticateBiometric = async (): Promise<boolean> => {
  try {
    const rnBiometrics = new ReactNativeBiometrics();

    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    if (!available) {
      console.error("Biometric authentication is not available");
      return false;
    }

    let promptMessage = "Authenticate";

    if (biometryType === BiometryTypes.TouchID) {
      promptMessage = "Use your fingerprint to authenticate";
    } else if (biometryType === BiometryTypes.FaceID) {
      promptMessage = "Use Face ID to authenticate";
    } else if (biometryType === BiometryTypes.Biometrics) {
      promptMessage = "Use biometric authentication";
    }

    const { success } = await rnBiometrics.simplePrompt({
      promptMessage,
      cancelButtonText: "Cancel",
    });

    return success;
  } catch (error) {
    console.error("Biometric authentication failed", error);
    return false;
  }
};
