import inquirer from "inquirer";
import * as dotenv from 'dotenv';
import { promptApp } from './controller/termcli.ctrl'

dotenv.config();

// Start cli app
promptApp();