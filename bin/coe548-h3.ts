#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Coe548H3Stack } from '../lib/coe548-h3-stack';

const app = new cdk.App();
new Coe548H3Stack(app, 'Coe548H3Stack');
