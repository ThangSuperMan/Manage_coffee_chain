import React from 'react';

interface CoffeeIconProps {
  width: string;
  height: string;
}

export const CoffeeIcon: React.FC<CoffeeIconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} viewBox="0 0 13 16" xmlns="http://www.w3.org/2000/svg">
      {' '}
      <path
        className="shape"
        d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
      ></path>{' '}
    </svg>
  );
};
