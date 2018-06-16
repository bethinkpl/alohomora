import time
import random
import sys

import RPi.GPIO as GPIO

TRANSMIT_PIN = 24

def transmit_code():

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(TRANSMIT_PIN, GPIO.OUT)
    GPIO.output(TRANSMIT_PIN, 1)
    time.sleep(5)
    GPIO.output(TRANSMIT_PIN, 0)
    time.sleep(3)


if __name__ == '__main__':
    transmit_code()
