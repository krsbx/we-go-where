import env from '@/utils/env';
import omise from 'omise';

class Omise {
  // eslint-disable-next-line no-use-before-define
  private static _instance: Omise;

  private secretKey: string;
  private publicKey: string;
  private omiseVersion: string;
  private omise: omise.IOmise;

  private constructor() {
    this.secretKey = env.OMISE_SECRET_KEY;
    this.publicKey = env.OMISE_PUBLIC_KEY;
    this.omiseVersion = env.OMISE_VERSION;

    this.omise = omise({
      secretKey: this.secretKey,
      publicKey: this.publicKey,
      omiseVersion: this.omiseVersion,
    });

    console.log(`Omise initialized with version ${this.omiseVersion}`);
  }

  public static get instance() {
    if (!Omise._instance) {
      Omise._instance = new Omise();
    }

    return Omise._instance.omise;
  }
}

export default Omise.instance;
