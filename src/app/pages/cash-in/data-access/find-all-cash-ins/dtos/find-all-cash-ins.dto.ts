/**
 * @description
 * NOTE: Type is `Partial` because the creation of the record is not controlled by our system
 */
export type FindAllCashInsDto = Readonly<
  Partial<{
    rut: string;
    verificationDigit: string;
    name: string;
    bankName: string;
    accountNumber: string;
    amount: number;
    channel: string;
    paymentInfoStatus: string;

    /**
     * @description Format: `dd/MM/yyyy`
     * @example 27/09/2023
     */
    transactionDate: string;

    /**
     * @description Format: `yyyy-MM-dd'T'HH:mm:ss`
     * @example 2021-09-27T12:00:00
     */
    refundDate: string;
  }>
>;
