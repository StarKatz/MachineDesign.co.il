import math

def Moore_circle (TAHO_XY, SIGMA_X, SIGMA_Y):
    sigma1 = (SIGMA_X + SIGMA_Y)/2 + math.sqrt((((SIGMA_X - SIGMA_Y) / 2) ** 2) + TAHO_XY ** 2)
    sigma2 = (SIGMA_X + SIGMA_Y)/2 - math.sqrt((((SIGMA_X - SIGMA_Y) / 2) ** 2) + TAHO_XY ** 2)
    taho1 = math.sqrt((((SIGMA_X - SIGMA_Y) / 2) ** 2) + TAHO_XY ** 2)
    taho2 = math.sqrt((((SIGMA_X - SIGMA_Y) / 2) ** 2) + TAHO_XY ** 2) * -1
    fi_p = ((math.atan((2 * TAHO_XY) / (SIGMA_X - SIGMA_Y)) / 2) * 180) / math.pi
    fi_s =  ((math.atan((SIGMA_X - SIGMA_Y) / (2 * TAHO_XY) * -1) / 2) * 180) / math.pi

def main ():
    Moore_circle(int(input("Enter Value of Taho: ")),int(input("Enter Value of Sigma X: ")), int(input("Enter Value of Sigma Y: ")))
if __name__ == "__main__":
    main()