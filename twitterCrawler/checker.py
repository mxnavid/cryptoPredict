import subprocess
import os
import time
import logging

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))


def didLogUpdate():
    f = os.path.getmtime('hastag.log')
    return f


def job():
    logging.basicConfig(
        filename="service.log",
        filemode='a',
        format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
        datefmt='%H:%M:%S',
        level=logging.INFO)
    while True:
        currTime = time.time()
        if currTime > (didLogUpdate() + 60.0):
            logging.info("Restarting the service \n Before Service Start")
            command = "python3 " + THIS_FOLDER + "/hashtagSearch.py"
            time.sleep(60)
        else:
            logging.info("Service Okay")
            continue


job()