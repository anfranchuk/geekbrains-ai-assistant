#!/bin/sh
sleep 10
celery --broker=redis://redis:6379 flower