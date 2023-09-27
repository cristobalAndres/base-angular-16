/**
 * @description
 * NOTE: Type is `Partial` because the creation of the record is not controlled by our system
 */
export type FindAllCashInsDto = Readonly<
  Partial<{
    rut: string;
    verification_digit: string;
    name: string;
    bank_name: string;
    account_number: string;
    amount: number;
    channel: string;
    payment_info_status: string;

    /**
     * @description Format: `dd/MM/yyyy`
     * @example 27/09/2023
     */
    transaction_date: string;

    /**
     * @description Format: `yyyy-MM-dd'T'HH:mm:ss`
     * @example 2021-09-27T12:00:00
     */
    refund_date: string;
  }>
>;
